import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events-services/events.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {EventRemoveDialog} from '.././remove-event-dialog/event-remove-dialog.component';
import {DialogConfig} from '.././remove-event-dialog/remove-event-dialog-config';
import {EventObject} from "../events.model/event-interface";

@Component({
  selector: 'app-events-expired-list',
  templateUrl: './events-expired-list.component.html',
  styleUrls: ['./events-expired-list.component.css']
})
export class EventsExpiredListComponent implements OnInit {
  events: EventObject[];
  config: MdDialogConfig = DialogConfig;

  constructor(private EventsService: EventsService, private Router: Router, private MdDialog: MdDialog) {
  }

  ngOnInit() {
    this.EventsService.loadExpiredEvents().subscribe(events => {
      this.events = events;
      this.EventsService.setExpiredEvents(events)
    });
  }

  showDetails(event) {
    this.Router.navigate(['events/details/cyclical', event.id]);
  }

  removeEvent(event) {
    this.EventsService.selectedEvent = event;
    this.openDialog();
  }

  private openDialog() {
    this.MdDialog.open(EventRemoveDialog, this.config);
  }
}
