import { TestBed } from '@angular/core/testing';

import { KonularService } from './konular.service';

describe('KonularService', () => {
  let service: KonularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
