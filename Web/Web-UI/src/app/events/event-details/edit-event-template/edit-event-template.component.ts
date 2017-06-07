import { EventEditService } from "../services/event-edit.service";
import { Component, OnInit } from "@angular/core";
import { EventObject } from "../../events.model/event-interface";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { EventsService } from "../../events-services/events.service";
import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../events.model/course.model";
import { Lecturer } from "../../events.model/lecturer.model";
import { AttendeesListModel } from "../../events.model/attendees-list.model";
import { UpdatedEventModel } from "../../events.model/update.models/event-update.model";
import { EventDetailsEditDialogService } from "../../event-details-edit-dialog/event-details-edit-dialog.service";
import { StorageService } from "../../../storage.service";
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogConfig } from "../../event-details-edit-dialog/event-details-edit-dialog-config";
import { AddUserModalWindowComponent } from "./add-user-modal/add-user-modal-window.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TimeSlot} from "../../events.model/time-slot.model";
import {Room} from "../../events.model/room.model";
/**
 * Created by Krzysztof Adamczak on 22.05.2017.
 */

@Component({
  templateUrl: './edit-event-template.component.html',
  styleUrls: ['./edit-event-template.component.css'],
  providers: [EventEditService, EventDetailsEditDialogService]
})
export class EventTemplateEditComponent implements OnInit {
  constructor(private EventEditService: EventEditService, private ActivatedRoute: ActivatedRoute,
    private EventsService: EventsService, private EventDetailsEditDialogService: EventDetailsEditDialogService,
    private StorageService: StorageService, private modalService: NgbModal) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
    });

    this.EventEditService.getCourseUnits().subscribe(courses => this.courses = courses);
    this.EventEditService.getLecturers().subscribe(lecturers => this.lecturers = lecturers);
    this.EventEditService.getTimeSlots().subscribe(res => this.timeSlots = res);
    this.EventEditService.getRooms().subscribe(res => this.rooms = res);
    this.event = this.EventsService.findEventById(this.eventId);

    if (this.event.isRestricted) {
      this.EventEditService.getEligibleParticipants(this.eventId, this.event.isCyclical).subscribe(res => this.eligibleParticipantsList = res);
    }
    if (this.event.eventStatus === 1) {
      this.EventEditService.getAttendanceListById(this.eventId).subscribe(res => this.attendeesList = res);
    }

    this.EventEditService.getAttendeesList().subscribe(res => this.attendees = res);

    this.original_data = this.event;
    this.eventDetailsForm = this.EventEditService.createFormGroup();
    this.updateForm();
  };

  public event: EventObject;
  public editEnabled: boolean = false;
  public eventDetailsForm: FormGroup;
  public courses: Course[];
  public lecturers: Lecturer[];
  public attendees: AttendeesListModel[];
  public attendeesList: AttendeesListModel[];
  public eligibleParticipantsList: AttendeesListModel[];
  public newCourseUnit: Course;
  public newLecturerUnit: Lecturer;
  public editAllFutureEvents: boolean = false;
  public selectedAttendee: AttendeesListModel;
  public selectedParticipant: AttendeesListModel;
  public timeSlots: TimeSlot[] = [];
  public rooms: Room[] = [];
  public selectedTimeSlot: TimeSlot = null;
  public selectedRoom: Room = null;

  public modelDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  public modelBeginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public modelEndTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  public minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  private eventId: number;
  private original_data: EventObject;
  private config: MdDialogConfig = DialogConfig;

  ngOnInit() {
    this.updateDateAndTime();
  }

  enableEditMode() {
    if (this.event.isCyclical) {
      this.EventDetailsEditDialogService.open(this.config).subscribe(() => {
        this.editAllFutureEvents = <boolean>this.StorageService.get('editAllFutureEvents');
        this.editEnabled = true;
      });
    } else {
      this.editEnabled = true;
    }
  }

  cancel() {
    this.event = this.original_data;
    this.updateForm();
    this.editEnabled = false;
    this.updateDateAndTime();
    this.selectedRoom = null;
    this.selectedTimeSlot = null;
  }

  courseUnitChanged() {
    this.eventDetailsForm.patchValue({ courseUnit: this.newCourseUnit });
  }

  lecturerChanged() {
    this.eventDetailsForm.patchValue({ lecturer: this.newLecturerUnit });
  }

  private updateDateAndTime() {
    this.modelDate = this.EventEditService.createDate(new Date(this.event.date));
    this.modelBeginTime = this.EventEditService.createBeginTime(new Date(this.event.timeSlot.beginTime));
    this.modelEndTime = this.EventEditService.createEndTime(new Date(this.event.timeSlot.endTime));
  }

  removeUserFromAttendeesList(data) {
    this.EventEditService.deleteUserFromAttendeeList(data, this.eventId).subscribe(() => {
      this.EventEditService.getAttendanceListById(this.eventId).subscribe(res => this.attendeesList = res);
    });
  }

  saveEvent(model, valid) {
    console.log(this.selectedRoom);
    console.log(this.selectedTimeSlot);
    if(!valid || !this.selectedRoom || !this.selectedTimeSlot){
      return;
    }

    const requestObject = this.createRequestModel(model);
    this.EventEditService.saveChangedEvent(this.eventId, requestObject).subscribe(res => {
      this.EventEditService.getEventById(this.eventId).subscribe(res => this.handleResponseAfterSave(res));
      this.EventsService.updateEvents();
      this.editEnabled = false;
    });
  }

  handleResponseAfterSave(response) {
    this.event = response;
    this.original_data = response;
    this.updateForm();
    this.updateDateAndTime();
    this.editEnabled = false;
  }

  createRequestModel(model) {
    model.date = this.modelDate.year + "-" + this.modelDate.month + "-" + this.modelDate.day + "T00:00:00";

    model.courseUnitId = model.courseUnit.id;
    delete model.courseUnit;

    model.lecturerId = model.lecturer.id;
    delete model.lecturer;
    delete model.room;
    delete model.timeSlot;

    model.timeSlotId = this.selectedTimeSlot.id;
    model.roomId = this.selectedRoom.id;

    console.log(model);
    return model;
  }

  addUserToAttendeesList() {
    this.EventEditService.addUserToAttendeeList(this.selectedAttendee, this.eventId).subscribe(res => {
      this.attendeesList.push(this.selectedAttendee);
      this.selectedAttendee = null;
    });
  }

  addNewEligibleParticipant() {
    this.EventEditService.addUserToEligibleParticipantsList(this.selectedParticipant, this.eventId).subscribe(res => {
      this.eligibleParticipantsList.push(this.selectedParticipant);
      this.selectedParticipant = null;
    });
  }

  private updateForm() {
    this.eventDetailsForm.patchValue({
      cycleIntervalWeekNumber: this.event.cycleIntervalWeekNumber,
      date: this.event.date,
      eventStatus: this.event.eventStatus,
      id: this.event.id,
      isCyclical: this.event.isCyclical,
      isRestricted: this.event.isRestricted,
      name: this.event.name,
      timeSlot: this.event.timeSlot,
      timeSlotId: this.event.timeSlotId
    });

    if (this.event.courseUnit) {
      this.eventDetailsForm.patchValue({
        courseUnitId: this.event.courseUnitId,
        courseUnit: this.event.courseUnit
      });
    }

    if (this.event.lecturer) {
      this.eventDetailsForm.patchValue({
        lecturerid: this.event.lecturerId,
        lecturer: this.event.lecturer
      });
    }

    if (this.event.room) {
      this.eventDetailsForm.patchValue({
        roomId: this.event.roomId,
        room: this.event.room
      });
    }
  }

  removeCourse() {
    this.eventDetailsForm.patchValue({
      courseUnit: {
        id: null
      }
    })
  }
}
