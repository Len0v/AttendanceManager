import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {EventsList} from '../events.model/events-list.enum';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {
  private IncomingEvents: EventsList[];
  private ActiveEvents: EventsList[];
  private ExpiredEvents: EventsList[];

  private incomingEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/incoming';
  private activeEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/active';
  private expiredEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/expired';
  private deleteEventbyIdApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';

  selectedEvent: EventsList;

  constructor(private http: Http) {
  }

  loadIncomingEvents(): Observable<EventsList[]> {
    return this.http.get(this.incomingEventsApiUrl)
      .map(this.extractData);
  }

  loadActiveEvents(): Observable<EventsList[]> {
    return this.http.get(this.activeEventsApiUrl)
      .map(this.extractData);
  }

  loadExpiredEvents(): Observable<EventsList[]> {
    return this.http.get(this.expiredEventsApiUrl)
      .map(this.extractData);
  }

  deleteEventById(id): Observable<Response> {
    return this.http.delete(this.deleteEventbyIdApiUrl + id);
  }

  setIncomingEvents(events) {
    this.IncomingEvents = events;
  }

  setActiveEvents(events) {
    this.ActiveEvents = events;
  }

  setExpiredEvents(events) {
    this.ExpiredEvents = events;
  }

  findEventById(id): EventsList {
    return this.IncomingEvents.concat(this.ActiveEvents, this.ExpiredEvents).filter(x => x['id'] === id)[0];
  }

  private extractData(res: Response) {
    return res.json() || {};
  }
}
