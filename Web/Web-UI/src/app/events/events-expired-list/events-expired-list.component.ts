import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events-services/events.service';
import {EventsList} from "../events.model/events-list.enum";
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {EventRemoveDialog} from '.././remove-event-dialog/event-remove-dialog.component';
import {DialogConfig} from '.././remove-event-dialog/remove-event-dialog-config';

@Component({
  selector: 'app-events-expired-list',
  templateUrl: './events-expired-list.component.html',
  styleUrls: ['./events-expired-list.component.css']
})
export class EventsExpiredListComponent implements OnInit {
  events: EventsList[];
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
    this.Router.navigate(['events/details', event.id]);
  }

  removeEvent(event){
    this.EventsService.selectedEvent = event;
    this.openDialog();
  }

  private openDialog() {
    let dialogRef = this.MdDialog.open(EventRemoveDialog, this.config);
  }
}
