import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicalEventsComponent } from './cyclical-events.component';

describe('CyclicalEventsComponent', () => {
  let component: CyclicalEventsComponent;
  let fixture: ComponentFixture<CyclicalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclicalEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
