import { TestBed } from '@angular/core/testing';

import { PriestprofilesService } from './service/priestprofiles.service';

describe('PriestprofilesService', () => {
  let service: PriestprofilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriestprofilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
