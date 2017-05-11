import {Component, OnInit} from '@angular/core';
import {EventsService} from '../events-services/events.service';
import {EventsList} from '../events.model/events-list.enum';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {EventRemoveDialog} from '.././remove-event-dialog/event-remove-dialog.component';
import {DialogConfig} from '.././remove-event-dialog/remove-event-dialog-config';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: EventsList[];
  config: MdDialogConfig = DialogConfig;

  constructor(private EventsService: EventsService, private Router: Router, private MdDialog: MdDialog) {
    this.events = [];
    this.EventsService.loadIncomingEvents().subscribe(incomingEvents => {
      this.events = this.events.concat(incomingEvents);
      this.EventsService.setIncomingEvents(incomingEvents);
    });
    this.EventsService.loadActiveEvents().subscribe(activeEvents => {
      this.events = this.events.concat(activeEvents);
      this.EventsService.setActiveEvents(activeEvents);
      });
  }

  ngOnInit() {
  }

  showDetails(event) {
    if(!event.isCyclical){
      this.Router.navigate(['events/details/noncyclical', event.id]);
    }else{
      this.Router.navigate(['events/details/cyclical', event.id]);
    }
  }

  removeEvent(event){
    this.EventsService.selectedEvent = event;
    this.openDialog();
  }

  private openDialog() {
    let dialogRef = this.MdDialog.open(EventRemoveDialog, this.config);
  }
}
