import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {EventCalendar} from "./event-calendar.enum";

@Injectable()
export class EventsCalendarService {
  dataForCalendarUrl = './src/app/mocks/eventscalendar.json'

  constructor(private http: Http) {
  }

  getData(): Observable<EventCalendar[]> {
    return this.http.get(this.dataForCalendarUrl)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.json() || {};
  }
}
