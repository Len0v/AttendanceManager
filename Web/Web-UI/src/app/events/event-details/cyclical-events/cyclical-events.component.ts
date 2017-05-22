import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsList} from "../.././events.model/events-list.enum";
import {EventsService} from "../.././events-services/events.service";
import {DialogConfig} from "./event-details-edit-dialog/event-details-edit-dialog-config";
import {MdDialogConfig} from "@angular/material";
import {EventDetailsEditDialogService} from "./event-details-edit-dialog/event-details-edit-dialog.service";
import {StorageService} from "../../../storage.service";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cyclical-events',
  templateUrl: './cyclical-events.component.html',
  styleUrls: ['./cyclical-events.component.css'],
  providers: [EventDetailsEditDialogService]
})
export class CyclicalEventsComponent implements OnInit {
  config: MdDialogConfig = DialogConfig;
  private date: String;
  private eventId: number;
  private event: EventsList;
  private original_data: EventsList;
  editEnabled: boolean = false;
  editAllFutureEvents: boolean = false;
  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  modelDate: NgbDateStruct = {year: 0, month: 0, day: 0};
  modelBeginTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  modelEndTime: NgbTimeStruct = {hour: 0, minute: 0, second: 0};


  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService,
              private EventDetailsEditDialogService: EventDetailsEditDialogService, private storage: StorageService) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
      this.event = this.EventsService.findEventById(this.eventId);
      this.original_data = this.event;
      let date = new Date(this.event['date']);
      let beginTime = new Date(this.event['timeSlot']['beginTime']);
      let endTime = new Date(this.event['timeSlot']['endTime']);
      this.modelDate.year = date.getFullYear();
      this.modelDate.month = date.getMonth() + 1;
      this.modelDate.day = date.getDate();
      this.modelBeginTime.hour = beginTime.getHours();
      this.modelBeginTime.minute = beginTime.getMinutes();
      this.modelEndTime.hour = endTime.getHours();
      this.modelEndTime.minute = endTime.getMinutes();
    });
  }

  ngOnInit() {
  }

  enableEditMode() {
    if (this.event['isCyclical']) {
      this.EventDetailsEditDialogService.open(this.config).subscribe(() => {
        this.editAllFutureEvents = this.storage.get('editAllFutureEvents');
        this.editEnabled = true;
      });
    } else {
      this.editEnabled = true;
    }
  }

  save() {
    console.log(this.event);
  }

  cancel() {
    this.editEnabled = false;
    this.event = this.original_data;
    this.editAllFutureEvents = false;
  }
}
