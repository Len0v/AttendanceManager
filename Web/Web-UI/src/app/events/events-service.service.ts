import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {EventsList} from './events-list.enum';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {
  private dataForListUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events';

  constructor(private http: Http) {
  }

  getDataForList(): Observable<EventsList[]> {
    return this.http.get(this.dataForListUrl)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.json() || {};
  }
}
