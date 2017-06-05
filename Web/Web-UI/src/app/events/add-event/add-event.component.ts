import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { EventEditService } from "../event-details/services/event-edit.service";
import { NgbDateStruct, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../events.model/course.model";
import { Lecturer } from "../events.model/lecturer.model";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [EventEditService]
})
export class AddEventComponent implements OnInit {
  public eventDetailsForm: FormGroup;

  public modelDate: NgbDateStruct = { year: 0, month: 0, day: 0 };
  public modelBeginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public modelEndTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  public minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  public courses: Course[];
  public lecturers: Lecturer[];
  public newCourseUnit: Course;
  public newLecturerUnit: Lecturer;

  constructor(private EventEditService: EventEditService) {
    this.eventDetailsForm = this.EventEditService.createFormGroup();

    this.EventEditService.getCourseUnits().subscribe(courses => this.courses = courses);
    this.EventEditService.getLecturers().subscribe(lecturers => this.lecturers = lecturers);
  }

  ngOnInit() {
  }

  courseUnitChanged() {
    this.eventDetailsForm.patchValue({ courseUnit: this.newCourseUnit });
  }

  lecturerChanged() {
    this.eventDetailsForm.patchValue({ lecturer: this.newLecturerUnit });
  }

  cancel() {

  }

  saveEvent(model, valid) {
    console.log(model);
  }
}