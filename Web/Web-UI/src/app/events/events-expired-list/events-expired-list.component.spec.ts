import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsExpiredListComponent } from './events-expired-list.component';

describe('EventsExpiredListComponent', () => {
  let component: EventsExpiredListComponent;
  let fixture: ComponentFixture<EventsExpiredListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsExpiredListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsExpiredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
