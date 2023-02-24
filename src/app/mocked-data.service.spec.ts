import { TestBed } from '@angular/core/testing';

import { MockedDataService } from './mocked-data.service';

describe('MockedDataService', () => {
  let service: MockedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
