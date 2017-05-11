import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCyclicalEventsComponent } from './non-cyclical-events.component';

describe('NonCyclicalEventsComponent', () => {
  let component: NonCyclicalEventsComponent;
  let fixture: ComponentFixture<NonCyclicalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCyclicalEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCyclicalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
