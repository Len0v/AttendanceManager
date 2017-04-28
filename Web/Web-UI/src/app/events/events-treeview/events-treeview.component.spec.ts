import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTreeviewComponent } from './events-treeview.component';

describe('EventsTreeviewComponent', () => {
  let component: EventsTreeviewComponent;
  let fixture: ComponentFixture<EventsTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
