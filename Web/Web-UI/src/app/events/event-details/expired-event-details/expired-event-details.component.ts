import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventObject } from "../../events.model/event-interface";
import { EventsService } from "../../events-services/events.service";
import { AttendeesListModel } from "../../events.model/attendees-list.model";
import { EventEditService } from "../services/event-edit.service";

@Component({
  selector: 'app-expired-event-details',
  templateUrl: './expired-event-details.component.html',
  styleUrls: ['./expired-event-details.component.css'],
  providers: [EventEditService]
})
export class ExpiredEventDetailsComponent implements OnInit {
  private eventId: number;
  public event: EventObject;
  public attendeesList: AttendeesListModel[];
  public attendees: AttendeesListModel[];
  public selectedAttendee: AttendeesListModel;
  public eligibleParticipantsList: AttendeesListModel[];

  constructor(private ActivatedRoute: ActivatedRoute, private EventsService: EventsService, private EventEditService: EventEditService) {
    this.ActivatedRoute.params.subscribe(param => {
      this.eventId = +param['id'];
      this.event = this.EventsService.findEventById(this.eventId);
      this.EventEditService.getAttendanceListById(this.eventId).subscribe(res => this.attendeesList = res);
      this.EventEditService.getAttendeesList().subscribe(res => this.attendees = res);

      if (this.event.isRestricted) {
        this.EventEditService.getEligibleParticipants(this.eventId, this.event).subscribe(res => this.eligibleParticipantsList = res);
      }
    });
  }

  ngOnInit() {
  }

  removeUserFromAttendeesList(data) {
    this.EventEditService.deleteUserFromAttendeeList(data, this.eventId).subscribe(() => {
      this.EventEditService.getAttendanceListById(this.eventId).subscribe(res => this.attendeesList = res);
    });
  }

  addUser() {
    this.EventEditService.addUserToAttendeeList(this.selectedAttendee, this.eventId).subscribe(() =>
    {
      let index: number = this.attendees.indexOf(this.selectedAttendee);
      if (index !== -1) {
        this.attendees.splice(index, 1);
      }
      this.attendeesList.push(this.selectedAttendee);
      this.selectedAttendee = null;
    });
  }
}
