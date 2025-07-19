import { TestBed } from '@angular/core/testing';

import { ManagerSubParishService } from './manager-sub-parish.service';

describe('ManagerSubParishService', () => {
  let service: ManagerSubParishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerSubParishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
