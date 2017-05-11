import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsList} from "../.././events.model/events-list.enum";
import {EventsService} from "../.././events-services/events.service";

@Component({
  selector: 'app-event-details',
  templateUrl: 'non-cyclical-events.component.html',
  styleUrls: ['non-cyclical-events.component.css']
})
export class NonCyclicalEventsComponent implements OnInit {
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
