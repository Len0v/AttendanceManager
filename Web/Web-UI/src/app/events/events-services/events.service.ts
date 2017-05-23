import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {StorageService} from '../../storage.service';
import {EventObject} from "../events.model/event-interface";

@Injectable()
export class EventsService {
  private IncomingEvents: EventObject[];
  private ActiveEvents: EventObject[];
  private ExpiredEvents: EventObject[];

  private incomingEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/incoming';
  private activeEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/active';
  private expiredEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/expired';
  private deleteEventbyIdApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';

  selectedEvent: EventObject;

  constructor(private http: Http, private storage: StorageService) {
  }

  loadIncomingEvents(): Observable<EventObject[]> {
    return this.http.get(this.incomingEventsApiUrl)
      .map(this.extractData);
  }

  loadActiveEvents(): Observable<EventObject[]> {
    return this.http.get(this.activeEventsApiUrl)
      .map(this.extractData);
  }

  loadExpiredEvents(): Observable<EventObject[]> {
    return this.http.get(this.expiredEventsApiUrl)
      .map(this.extractData);
  }

  deleteEventById(id): Observable<Response> {
    return this.http.delete(this.deleteEventbyIdApiUrl + id);
  }

  setIncomingEvents(events) {
    this.IncomingEvents = events;
    this.storage.set('IncomingEvents', this.IncomingEvents);
  }

  setActiveEvents(events) {
    this.ActiveEvents = events;
    this.storage.set('ActiveEvents', this.ActiveEvents);
  }

  setExpiredEvents(events) {
    this.ExpiredEvents = events;
    this.storage.set('ExpiredEvents', this.ExpiredEvents);
  }

  findEventById(id): EventObject {
    if(!this.IncomingEvents){
      this.IncomingEvents = this.storage.get('IncomingEvents');
    }
    if(!this.ActiveEvents){
      this.ActiveEvents = this.storage.get('ActiveEvents');
    }
    if(!this.ExpiredEvents){
      this.ExpiredEvents = this.storage.get('ExpiredEvents');
    }
    return this.IncomingEvents.concat(this.ActiveEvents, this.ExpiredEvents).filter(x => x['id'] === id)[0];
  }

  updateEvents(){
    this.loadIncomingEvents().subscribe(res => this.setIncomingEvents(res));
    this.loadActiveEvents().subscribe(res => this.setActiveEvents(res));
    this.loadExpiredEvents().subscribe(res => this.setExpiredEvents(res));
  }

  private extractData(res: Response) {
    return res.json() || {};
  }
}
