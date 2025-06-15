import { TestBed } from '@angular/core/testing';

import { ParishService } from './parish.service';

describe('ParishService', () => {
  let service: ParishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
