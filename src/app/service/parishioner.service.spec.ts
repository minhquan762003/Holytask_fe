import { TestBed } from '@angular/core/testing';

import { ParishionerService } from './parishioner.service';

describe('ParishionerService', () => {
  let service: ParishionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParishionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
