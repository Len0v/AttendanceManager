import {Component, OnInit} from '@angular/core';
import {EventsList} from '../events-list.enum';
import {EventsCalendarService} from './events-calendar.service';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css'],
  providers: [EventsCalendarService]
})
export class EventsCalendarComponent implements OnInit {
  events: any[];

  header: any;

  event: EventsList;

  dialogVisible: boolean = false;

  constructor(private EventsCalendarService: EventsCalendarService) {
  }

  ngOnInit() {
    this.EventsCalendarService.getData().subscribe(events => this.events = events);

    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
  }

  dayClick($event) {
    console.log($event);
  }
}
