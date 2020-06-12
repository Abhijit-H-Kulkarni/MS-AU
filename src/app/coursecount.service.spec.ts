import { TestBed } from '@angular/core/testing';

import { CoursecountService } from './coursecount.service';

describe('CoursecountService', () => {
  let service: CoursecountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursecountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
