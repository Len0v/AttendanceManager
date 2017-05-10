import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsList} from "../events.model/events-list.enum";
import {EventsService} from "../events-services/events.service";

@Component({
  selector: 'app-event-details',
  templateUrl: 'event-details.component.html',
  styleUrls: ['event-details.component.css'],
  providers: [EventsService]
})
export class EventDetailsComponent implements OnInit {
  private eventId: number;
  private event: EventsList;

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
      console.log('constructor');
      console.log(this.EventsService);
    });
  }

  ngOnInit() {
    console.log('init');
    console.log(this.EventsService)
  }

}
