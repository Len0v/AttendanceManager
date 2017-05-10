import {Component, OnInit} from '@angular/core';
import {EventsService} from '.././events-service.service';
import {EventsList} from '../events-list.enum';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [EventsService]
})
export class EventsListComponent implements OnInit {
  data: EventsList[];

  selectedRow: EventsList;

  constructor(private EventsService: EventsService) {
  }

  ngOnInit() {
    this.EventsService.getDataForList().subscribe(events => {this.data = events; console.log('ok'); console.log(events)});
    this.selectedRow = null;
  }

  rowSelect($event) {
    this.selectedRow = $event.data;
  }

  rowUnselect() {
    this.selectedRow = null;
  }

  addEnabled() {
    if (this.selectedRow !== null) {
      return true;
    } else {
      return false;
    }
  }

  editRemoveEnabled(){
    if (this.selectedRow !== null) {
      return false;
    } else {
      return true;
    }
  }
}
