import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsEditDialogComponent } from './event-details-edit-dialog.component';

describe('EventDetailsEditDialogComponent', () => {
  let component: EventDetailsEditDialogComponent;
  let fixture: ComponentFixture<EventDetailsEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
