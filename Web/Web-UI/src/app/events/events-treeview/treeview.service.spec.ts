import { TestBed, inject } from '@angular/core/testing';

import { TreeviewService } from './treeview.service';

describe('TreeviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeviewService]
    });
  });

  it('should ...', inject([TreeviewService], (service: TreeviewService) => {
    expect(service).toBeTruthy();
  }));
});
