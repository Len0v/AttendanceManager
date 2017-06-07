import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events-services/events.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { EventObject } from "../events.model/event-interface";
import { EventDetailsEditDialogService } from "../event-details-edit-dialog/event-details-edit-dialog.service";
import { StorageService } from "../../storage.service";
import { DialogConfig } from "../remove-event-dialog/remove-event-dialog-config";
import { EventRemoveDialog } from "../remove-event-dialog/event-remove-dialog.component";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [EventDetailsEditDialogService]
})
export class EventsListComponent implements OnInit {
  events: EventObject[];
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
    this.Router.navigate(['events/details', event.id]);
  }

  removeEvent(event) {
    this.EventsService.selectedEvent = event;
    this.openDialog();
  }

  private openDialog() {
    this.MdDialog.open(EventRemoveDialog, this.config);
  }
}
