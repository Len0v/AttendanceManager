import {Injectable} from "@angular/core";
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {EventObject} from "../../events.model/event-interface";
import {Observable} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {Course} from "../../events.model/course.model";
import {Lecturer} from "../../events.model/lecturer.model";
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

  public getCourseUnits(): Observable<Course[]> {
    return this.http.get(this.courseUnitsApiUrl)
      .map(this.extractData)
  }

  public getLecturers(): Observable<Lecturer[]> {
    return this.http.get(this.lecturersApiUrl)
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
      isCyclical: true,
      isRestricted: false,
      courseUnitId: '',
      courseUnit: this._fb.group({
        id: '',
        courseId: '',
        course: this._fb.group({
          id: '',
          courseName: {value: '', disabled: true},
          ects: {value: '', disabled: true}
        }),
        courseTypeId: '',
        courseType: this._fb.group({
          id: '',
          type: '',
          hoursNumber: {value: '', disabled: true}
        })
      }),
      lecturerId: '',
      lecturer: this._fb.group({
        id: '',
        name: {value: '', disabled: true},
        surname: {value: '', disabled: true},
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
    return res.json() || {};
  }
}
