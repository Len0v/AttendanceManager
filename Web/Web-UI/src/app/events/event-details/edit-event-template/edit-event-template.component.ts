import {EventEditService} from "../services/event-edit.service";
import {Component, OnInit} from "@angular/core";
import {EventObject} from "../../events.model/event-interface";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {EventsService} from "../../events-services/events.service";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Course} from "../../events.model/course.model";
import {Lecturer} from "../../events.model/lecturer.model";
/**
 * Created by Krzysztof Adamczak on 22.05.2017.
 */

@Component({
  templateUrl: './edit-event-template.component.html',
  styleUrls: ['./edit-event-template.component.css'],
  providers: [EventEditService]
})
export class EventTemplateEditComponent implements OnInit {
  constructor(private EventEditService: EventEditService, private ActivatedRoute: ActivatedRoute,
              private EventsService: EventsService) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
    });

    this.EventEditService.getCourseUnits().subscribe(courses => this.courses = courses);
    this.EventEditService.getLecturers().subscribe(lecturers => this.lecturers = lecturers);
    this.event = this.EventsService.findEventById(this.eventId);
    this.original_data = this.event;
    this.eventDetailsForm = this.EventEditService.createFormGroup();

    (<FormGroup>this.eventDetailsForm)
      .setValue(this.event, {onlySelf: true});
  };

  public event: EventObject;
  public editEnabled: boolean = false;
  public eventDetailsForm: FormGroup;
  public courses: Course[];
  public lecturers: Lecturer[];
  public newCourseUnit: Course;
  public newLecturerUnit: Lecturer;

  public modelDate: NgbDateStruct = {year: 0, month: 0, day: 0};
  public modelBeginTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  public modelEndTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  private eventId: number;
  private original_data: EventObject;

  ngOnInit() {
    this.updateDateAndTime();
  }

  enableEditMode() {
    this.editEnabled = true;
  }

  cancel() {
    this.event = this.original_data;
    this.eventDetailsForm.reset(this.event);
    this.editEnabled = false;
    this.updateDateAndTime();
  }

  courseUnitChanged() {
    this.eventDetailsForm.patchValue({courseUnit: this.newCourseUnit});
  }

  lecturerChanged() {
    this.eventDetailsForm.patchValue({lecturer: this.newLecturerUnit});
  }

  private updateDateAndTime() {
    this.modelDate = this.EventEditService.createDate(new Date(this.event.date));
    this.modelBeginTime = this.EventEditService.createBeginTime(new Date(this.event.timeSlot.beginTime));
    this.modelEndTime = this.EventEditService.createEndTime(new Date(this.event.timeSlot.endTime));
  }

  save(model, valid) {
    console.log('save');
    console.log(JSON.stringify(model));
    this.EventEditService.saveChangedEvent(this.eventId, model).subscribe(res => console.log(res));
  }
}
