import { TestBed } from '@angular/core/testing';

import { RepairStatusService } from './repair-status.service';

describe('RepairStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairStatusService = TestBed.get(RepairStatusService);
    expect(service).toBeTruthy();
  });
});
