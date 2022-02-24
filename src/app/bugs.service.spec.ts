import { TestBed } from '@angular/core/testing';

import { BugsService } from './services/bugs.service';

describe('BugsService', () => {
  let service: BugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
