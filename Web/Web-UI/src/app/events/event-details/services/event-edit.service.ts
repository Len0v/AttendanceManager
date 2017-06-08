import {Injectable} from "@angular/core";
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {EventObject} from "../../events.model/event-interface";
import {Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Course} from "../../events.model/course.model";
import {Lecturer} from "../../events.model/lecturer.model";
import {AttendeesListModel} from "../../events.model/attendees-list.model";
import {TimeSlot} from "../../events.model/time-slot.model";
import {Room} from "../../events.model/room.model";
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
  private timeSlotsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/timeSlots/';
  private roomsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/rooms/';
  private attendanceListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventattendees/';
  private attendeesListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/attendees/';
  private deleteUserFromAttendanceListApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventattendees';
  private eligibleParticipantsForCourseApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/courseauthorized/';
  private eligibleParticipantsForEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventauthorized/';
  private addEligibleParticipantsForEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/eventauthorized/';
  private addEligibleParticipantsForCourseApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/courseauthorized/';
  private addEventApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';

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

  public getEligibleParticipants(eventId, event): Observable<AttendeesListModel[]> {
    if (event.courseUnitId) {
      return this.http.get(this.eligibleParticipantsForCourseApiUrl + event.courseUnitId).map(this.extractData);
    } else {
      return this.http.get(this.eligibleParticipantsForEventApiUrl + eventId).map(this.extractData);
    }
  }

  public getTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get(this.timeSlotsApiUrl)
      .map(this.extractData);
  }

  public getRooms(): Observable<Room[]>{
    return this.http.get(this.roomsApiUrl)
      .map(this.extractData);
  }

  public addUserToEligibleParticipantsList(user, event) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });
    if (event.courseUnitId) {
      return this.http.post(this.addEligibleParticipantsForCourseApiUrl, {
        courseUnitId: event.courseUnitId,
        attendeeId: user.id
      }, options)
        .map(this.extractData);
    } else {
      return this.http.post(this.addEligibleParticipantsForEventApiUrl, {
        eventId: event.id,
        attendeeId: user.id
      }, options)
        .map(this.extractData);
    }
  }

  public addEvent(data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(this.addEventApiUrl, data, options)
      .map(this.extractData);
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
    return this.http.post(this.deleteUserFromAttendanceListApiUrl, {eventId: eventId, attendeeId: data.id}, options)
      .map(this.extractData);
  }

  public saveChangedEvent(id, data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.saveEventApiUrl, JSON.stringify(data), options)
      .map(this.extractData);
  }

  public createFormGroup() {
    return this._fb.group({
      id: '',
      name: this._fb.control(null, [Validators.required, Validators.minLength(5)]),
      date: this._fb.control(null),
      eventStatus: '',
      cycleIntervalWeekNumber: this._fb.control(1, Validators.required),
      isCyclical: false,
      isRestricted: false,
      courseUnitId: null,
      courseUnit: this._fb.group({
        id: null,
        courseId: null,
        course: this._fb.group({
          id: null,
          courseName: {value: null, disabled: true},
          ects: {value: null, disabled: true}
        }),
        courseTypeId: null,
        courseType: this._fb.group({
          id: null,
          type: null,
          hoursNumber: {value: null, disabled: true}
        })
      }),
      lecturerId: null,
      lecturer: this._fb.group({
        id: '',
        name: {value: '', disabled: true},
        surname: {value: '', disabled: true},
        pesel: '',
        sex: '',
        employeeNumber: '',
        birthDate: ''
      }),
      roomId: null,
      room: this._fb.group({
        id: '',
        name: '',
        building: ''
      }),
      timeSlotId: null,
      timeSlot: this._fb.group({
        id: '',
        dayOfWeek: null,
        beginTime: null,
        endTime: null
      })
    });
  }

  public createDate(date) {
    let modelDate = {year: 0, month: 0, day: 0};
    modelDate.year = date.getFullYear();
    modelDate.month = date.getMonth() + 1;
    modelDate.day = date.getDate();
    return modelDate;
  }

  public createBeginTime(beginTime) {
    let modelBeginTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
    modelBeginTime.hour = beginTime.getHours();
    modelBeginTime.minute = beginTime.getMinutes();
    return modelBeginTime;
  }

  public createEndTime(endTime) {
    let modelEndTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
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
