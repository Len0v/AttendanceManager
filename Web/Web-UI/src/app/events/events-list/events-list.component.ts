import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events-services/events.service';
import {EventsList} from '../events.model/events-list.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [EventsService]
})
export class EventsListComponent implements OnInit {
  events: EventsList[];

  constructor(private EventsService: EventsService, private Router: Router) {
    this.EventsService.loadIncomingEvents().subscribe(events => {
      this.events = events;
      this.EventsService.setIncomingEvents(events);
      this.EventsService.loadActiveEvents().subscribe(events2 => {
        this.events = this.events.concat(events2);
        this.EventsService.setActiveEvents(events2);
        console.log('list contructor');
        console.log(this.EventsService);
      });
    });
  }

  ngOnInit() {
  }

  showDetails(event) {
    console.log(event);
    console.log(this.EventsService);
    this.Router.navigate(['events/details', event.id]);
  }

  removeEvent(event){

  }
}
