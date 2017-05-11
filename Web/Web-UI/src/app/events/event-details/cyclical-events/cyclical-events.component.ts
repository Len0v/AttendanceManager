import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsList} from "../.././events.model/events-list.enum";
import {EventsService} from "../.././events-services/events.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cyclical-events',
  templateUrl: './cyclical-events.component.html',
  styleUrls: ['./cyclical-events.component.css']
})
export class CyclicalEventsComponent implements OnInit {
  private eventId: number;
  private event: EventsList;

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService) {
      this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
      this.event = this.EventsService.findEventById(this.eventId);
    });
  }

  ngOnInit() {
  }

}
