import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {EventsService} from '../events-services/events.service';

@Component({
    templateUrl: './remove-event-dialog.html',
    styleUrls: ['./remove-event-dialog.css']
})
export class EventRemoveDialog{
    constructor(public MdDialogRef: MdDialogRef<EventRemoveDialog>, private EventsService: EventsService){}

    accept(){
        this.EventsService.deleteEventById(this.EventsService.selectedEvent['id']).subscribe(() => this.MdDialogRef.close());
    }

    decline(){
        this.MdDialogRef.close();
    }
}