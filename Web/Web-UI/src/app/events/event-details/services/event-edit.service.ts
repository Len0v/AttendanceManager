import { Injectable } from "@angular/core";
import { Response, Http, Headers, RequestOptions } from "@angular/http";
import { EventObject } from "../../events.model/event-interface";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../events.model/course.model";
import { Lecturer } from "../../events.model/lecturer.model";
import { AttendeesListModel } from "../../events.model/attendees-list.model";
/**
 * Created by Krzysztof Adamczak on 22.05.2017.
 */

@Injectable()
export class EventEditService {
  constructor(private http: Http, private _fb: FormBuilder) {
  }

  private eventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';
  private courseUnitsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/courseunits/';
  private lecturersApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/lecturers/';
  private saveEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';
  private attendanceListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventattendees/';
  private attendeesListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/attendees/';
  private deleteUserFromAttendanceListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventattendees';
  private eligibleParticipantsForCourseApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/courseauthorized/';
  private eligibleParticipantsForEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventauthorized/';
  private addEligibleParticipantsForEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventauthorized/';
  private addEligibleParticipantsForCourseApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/courseauthorized/';

  public getEventById(id): Observable<EventObject> {
    return this.http.get(this.eventApiUrl + id)
      .map(this.extractData);
  }

  public getCourseUnits(): Observable<Course[]> {
    return this.http.get(this.courseUnitsApiUrl)
      .map(this.extractData)
  }

  public getLecturers(): Observable<Lecturer[]> {
    return this.http.get(this.lecturersApiUrl)
      .map(this.extractData);
  }

  public getAttendanceListById(id): Observable<AttendeesListModel[]> {
    return this.http.get(this.attendanceListApiUrl + id)
      .map(this.extractData);
  }

  public getAttendeesList(): Observable<AttendeesListModel[]> {
    return this.http.get(this.attendeesListApiUrl).map(this.extractData);
  }

  public getEligibleParticipants(eventId, isCyclical): Observable<AttendeesListModel[]> {
    if(isCyclical){
      return this.http.get(this.eligibleParticipantsForCourseApiUrl + eventId).map(this.extractData);
    }else{
      return this.http.get(this.eligibleParticipantsForEventApiUrl + eventId).map(this.extractData);
    }
  }

  public addUserToEligibleParticipantsList(user, eventId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });
    if(user.IsCyclical){
      return this.http.post(this.addEligibleParticipantsForCourseApiUrl, { eventId: eventId, attendeeId: user.id }, options)
        .map(this.extractData);
    }else{
      return this.http.post(this.addEligibleParticipantsForEventApiUrl, { eventId: eventId, attendeeId: user.id }, options)
        .map(this.extractData);
    }
  }

  public deleteUserFromAttendeeList(data, eventId): Observable<any> {
    let body = JSON.stringify({
      eventId: eventId,
      attendeeId: data.id
    });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers,
      body: body
    });
    return this.http.delete(this.deleteUserFromAttendanceListApiUrl, options)
      .map(this.extractData);
  }

  public addUserToAttendeeList(data, eventId): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.deleteUserFromAttendanceListApiUrl, { eventId: eventId, attendeeId: data.id }, options)
      .map(this.extractData);
  }

  public saveChangedEvent(id, data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.saveEventApiUrl, JSON.stringify(data), options)
      .map(this.extractData);
  }

  public createFormGroup() {
    return this._fb.group({
      id: '',
      name: '',
      date: '',
      eventStatus: '',
      cycleIntervalWeekNumber: '',
      isCyclical: false,
      isRestricted: false,
      courseUnitId: null,
      courseUnit: this._fb.group({
        id: null,
        courseId: null,
        course: this._fb.group({
          id: null,
          courseName: { value: null, disabled: true },
          ects: { value: null, disabled: true }
        }),
        courseTypeId: null,
        courseType: this._fb.group({
          id: null,
          type: null,
          hoursNumber: { value: null, disabled: true }
        })
      }),
      lecturerId: '',
      lecturer: this._fb.group({
        id: '',
        name: { value: '', disabled: true },
        surname: { value: '', disabled: true },
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
  }

  public createDate(date) {
    let modelDate = { year: 0, month: 0, day: 0 };
    modelDate.year = date.getFullYear();
    modelDate.month = date.getMonth() + 1;
    modelDate.day = date.getDate();
    return modelDate;
  }

  public createBeginTime(beginTime) {
    let modelBeginTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
    modelBeginTime.hour = beginTime.getHours();
    modelBeginTime.minute = beginTime.getMinutes();
    return modelBeginTime;
  }

  public createEndTime(endTime) {
    let modelEndTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
    modelEndTime.hour = endTime.getHours();
    modelEndTime.minute = endTime.getMinutes();
    return modelEndTime;
  }

  private extractData(res: Response) {
    let body;

    if (res.text()) {
      body = res.json();
    }

    return body || {};
  }
}
