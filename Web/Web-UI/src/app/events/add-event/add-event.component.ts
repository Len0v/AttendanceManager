import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {EventEditService} from "../event-details/services/event-edit.service";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Course} from "../events.model/course.model";
import {Lecturer} from "../events.model/lecturer.model";
import {AttendeesListModel} from "../events.model/attendees-list.model";
import {TimeSlot} from "../events.model/time-slot.model";
import {Room} from "../events.model/room.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [EventEditService]
})
export class AddEventComponent implements OnInit {
  public eventDetailsForm: FormGroup;

  public modelDate: NgbDateStruct = {year: null, month: null, day: null};

  public minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  public courses: Course[];
  public lecturers: Lecturer[];
  public newCourseUnit: Course;
  public newLecturerUnit: Lecturer;
  public students: AttendeesListModel[];
  public eligibleParticipantsList: AttendeesListModel[] = [];
  public selectedParticipant: AttendeesListModel;
  public timeSlots: TimeSlot[] = [];
  public selectedTimeSlot: TimeSlot;
  public rooms: Room[] = [];
  public selectedRoom;

  constructor(private EventEditService: EventEditService, private Router: Router) {
    this.eventDetailsForm = this.EventEditService.createFormGroup();

    this.EventEditService.getCourseUnits().subscribe(courses => this.courses = courses);
    this.EventEditService.getLecturers().subscribe(lecturers => this.lecturers = lecturers);
    this.EventEditService.getAttendeesList().subscribe(res => this.students = res);
    this.EventEditService.getTimeSlots().subscribe(res => this.timeSlots = res);
    this.EventEditService.getRooms().subscribe(res => this.rooms = res);
  }

  ngOnInit() {
  }

  courseUnitChanged() {
    this.eventDetailsForm.patchValue({courseUnit: this.newCourseUnit});
  }

  lecturerChanged() {
    this.eventDetailsForm.patchValue({lecturer: this.newLecturerUnit});
  }

  cancel() {
    this.eventDetailsForm.reset();
    this.modelDate = {year: null, month: null, day: null};
    this.selectedTimeSlot = null;

    for (let i = 0, length = this.eligibleParticipantsList.length; i < length; i++) {
      this.students.push(this.eligibleParticipantsList[i]);
    }

    this.eligibleParticipantsList = [];
  }

  saveEvent(model, valid) {
    if (!valid || !this.newLecturerUnit || !this.selectedRoom || !this.selectedTimeSlot ||
      (!this.modelDate.year || !this.modelDate.month || !this.modelDate.day)) {
      return;
    }

    delete model.courseUnit;
    delete model.lecturer;
    delete model.room;
    delete model.id;
    model.eventStatus = 0;
    let id_array: Number[] = [];
    for (let i = 0, length = this.eligibleParticipantsList.length; i < length; i++) {
      id_array.push(this.eligibleParticipantsList[i].id);
    }

    model.timeSlotId = this.selectedTimeSlot ? this.selectedTimeSlot.id : null;
    model.courseUnitId = this.newCourseUnit ? this.newCourseUnit.id : null;
    model.lecturerId = this.newLecturerUnit.id;
    model.roomId = this.selectedRoom.id;
    model.date = this.modelDate.year + "-" + this.modelDate.month + "-" + this.modelDate.day + "T00:00:00";
    delete model.timeSlot;

    let requestObject = {
      event: model,
      authorizedAttendeesIds: id_array
    };

    this.EventEditService.addEvent(requestObject).subscribe(res => {
      this.Router.navigate(['events']);
    });
  }

  addNewEligibleParticipant() {
    this.eligibleParticipantsList.push(this.selectedParticipant);

    let index: number = this.students.indexOf(this.selectedParticipant);
    if (index !== -1) {
      this.students.splice(index, 1);
    }

    this.selectedParticipant = null;
  }

  removeUserFromAttendeesList(user) {
    let index: number = this.eligibleParticipantsList.indexOf(user);
    if (index !== -1) {
      this.eligibleParticipantsList.splice(index, 1);
    }

    this.students.push(user);
  }

  removeLecturer() {
    this.newLecturerUnit = null;
  }

  removeCourse() {
    this.newCourseUnit = null;
  }
}
