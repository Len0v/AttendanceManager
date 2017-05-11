import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCyclicalEventsComponent } from './non-cyclical-events.component';

describe('NonCyclicalEventsComponent', () => {
  let component: NonCyclicalEventsComponent;
  let fixture: ComponentFixture<NonCyclicalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
