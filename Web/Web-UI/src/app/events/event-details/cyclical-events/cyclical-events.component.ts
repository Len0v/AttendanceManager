import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../.././events-services/events.service";
import {DialogConfig} from "../../event-details-edit-dialog/event-details-edit-dialog-config";
import {MdDialogConfig} from "@angular/material";
import {EventDetailsEditDialogService} from "../../event-details-edit-dialog/event-details-edit-dialog.service";
import {StorageService} from "../../../storage.service";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {EventObject} from "../../events.model/event-interface";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-cyclical-events',
  templateUrl: './cyclical-events.component.html',
  styleUrls: ['./cyclical-events.component.css'],
  providers: [EventDetailsEditDialogService]
})
export class CyclicalEventsComponent implements OnInit {
  config: MdDialogConfig = DialogConfig;
  private eventId: number;
  private event: EventObject;
  private original_data: EventObject;
  public eventDetailsForm: FormGroup;
  public editEnabled: boolean = false;
  public editAllFutureEvents: boolean = false;

  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  modelDate: NgbDateStruct = {year: 0, month: 0, day: 0};
  modelBeginTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  modelEndTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService,
              private EventDetailsEditDialogService: EventDetailsEditDialogService, private storage: StorageService,
              private _fb: FormBuilder, private cref: ChangeDetectorRef) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
    });
  }

  ngOnInit() {
    this.fillData();

    this.eventDetailsForm = this._fb.group({
      id: '',
      name: '',
      date: '',
      eventStatus: '',
      cycleIntervalWeekNumber: '',
      isCyclical: true,
      isRestricted: false,
      courseUnitId: '',
      courseUnit: this._fb.group({
        id: '',
        courseId: '',
        course: this._fb.group({
          id: '',
          courseName: '',
          ects: ''
        }),
        courseTypeId: '',
        courseType: ''
      }),
      lecturerId: '',
      lecturer: this._fb.group({
        id: '',
        name: '',
        surname: '',
        pesel: '',
        sex: '',
        employeeNumber: '',
        birthDate: ''
      }),
      roomId: '',
      room: this._fb.group({
        id: '',
        name: '',
        building: ''
      }),
      timeSlotId: '',
      timeSlot: this._fb.group({
        id: '',
        dayOfWeek: '',
        beginTime: '',
        endTime: ''
      })
    });

    (<FormGroup>this.eventDetailsForm)
      .setValue(this.event, {onlySelf: true});
    console.log(this.event);
    console.log(this.eventDetailsForm);
  }

  fillData() {
    this.event = this.EventsService.findEventById(this.eventId);
    this.original_data = this.event;
    let date = new Date(this.event.date);
    let beginTime = new Date(this.event.timeSlot.beginTime);
    let endTime = new Date(this.event.timeSlot.endTime);
    this.modelDate.year = date.getFullYear();
    this.modelDate.month = date.getMonth() + 1;
    this.modelDate.day = date.getDate();
    this.modelBeginTime.hour = beginTime.getHours();
    this.modelBeginTime.minute = beginTime.getMinutes();
    this.modelEndTime.hour = endTime.getHours();
    this.modelEndTime.minute = endTime.getMinutes();
  }

  enableEditMode() {
    if (this.event.isCyclical) {
      this.EventDetailsEditDialogService.open(this.config).subscribe(() => {
        this.editAllFutureEvents = this.storage.get('editAllFutureEvents');
        this.editEnabled = true;
        this.cref.markForCheck();
      });
    } else {
      this.editEnabled = true;
      this.cref.markForCheck();
    }
  }

  save(model: EventObject, isValid: boolean) {
    console.log(model);
    console.log(isValid);
  }

  cancel() {
    this.editEnabled = false;
    this.event = this.original_data;
    this.editAllFutureEvents = false;
  }
}
