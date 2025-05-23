import { TestBed } from '@angular/core/testing';

import { VisitscheduleService } from './service/visitschedule.service';

describe('VisitscheduleService', () => {
  let service: VisitscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
