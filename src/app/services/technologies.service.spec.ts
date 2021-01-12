import { TestBed } from '@angular/core/testing';

import { TechnologiesService as TechnologiesService } from './technologies.service';

describe('TechnologiesServiceService', () => {
  let service: TechnologiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
