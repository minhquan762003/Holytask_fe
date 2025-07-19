import { TestBed } from '@angular/core/testing';

import { ManagerParishService } from './manager-parish.service';

describe('ManagerParishService', () => {
  let service: ManagerParishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerParishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
