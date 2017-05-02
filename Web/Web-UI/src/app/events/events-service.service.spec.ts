import { TestBed, inject } from '@angular/core/testing';

import { EventsService} from './events-service.service';

describe('EventsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService]
    });
  });

  it('should ...', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
