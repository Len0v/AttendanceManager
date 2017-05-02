import { TestBed, inject } from '@angular/core/testing';

import { EventsCalendarService } from './events-calendar.service';

describe('EventsCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsCalendarService]
    });
  });

  it('should ...', inject([EventsCalendarService], (service: EventsCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
