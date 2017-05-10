import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events-services/events.service';
import {EventsList} from "../events.model/events-list.enum";

@Component({
  selector: 'app-events-expired-list',
  templateUrl: './events-expired-list.component.html',
  styleUrls: ['./events-expired-list.component.css']
})
export class EventsExpiredListComponent implements OnInit {
  events: EventsList[];

  constructor(private EventsService: EventsService) {
  }

  ngOnInit() {
    this.EventsService.loadExpiredEvents().subscribe(events => {
      this.events = events;
      this.EventsService.setExpiredEvents(events)
    });
  }

  showDetails(row){
    console.log(row)
  }
}