import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {MdDialogRef, MdDialog} from '@angular/material';
import {EventDetailsEditDialogComponent} from "./event-details-edit-dialog.component";

@Injectable()
export class EventDetailsEditDialogService {
  constructor(private MdDialog: MdDialog) {
  }

  open(config): Observable<boolean> {
    let dialogRef: MdDialogRef<EventDetailsEditDialogComponent>;
    dialogRef = this.MdDialog.open(EventDetailsEditDialogComponent, config);
    return dialogRef.afterClosed();
  }
}
