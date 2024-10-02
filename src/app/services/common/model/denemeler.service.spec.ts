import { TestBed } from '@angular/core/testing';

import { DenemelerService } from './denemeler.service';

describe('DenemelerService', () => {
  let service: DenemelerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenemelerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
