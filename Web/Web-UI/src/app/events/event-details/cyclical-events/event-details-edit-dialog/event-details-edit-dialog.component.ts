import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {StorageService} from "../../../../storage.service";

@Component({
  selector: 'app-event-details-edit-dialog',
  templateUrl: './event-details-edit-dialog.component.html',
  styleUrls: ['./event-details-edit-dialog.component.css']
})
export class EventDetailsEditDialogComponent implements OnInit {
  constructor(public MdDialogRef: MdDialogRef<EventDetailsEditDialogComponent>, private storage: StorageService) {
  }

  ngOnInit() {
  }

  accept() {
    this.storage.set('editAllFutureEvents', true);
    this.MdDialogRef.close();
  }

  decline() {
    this.storage.set('editAllFutureEvents', false);
    this.MdDialogRef.close();
  }
}
