import { TestBed } from '@angular/core/testing';

import { SubparishService } from './subparish.service';

describe('SubparishService', () => {
  let service: SubparishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubparishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
