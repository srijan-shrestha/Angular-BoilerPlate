import { TestBed } from '@angular/core/testing';

import { NavResetService } from './nav-reset.service';

describe('NavResetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavResetService = TestBed.get(NavResetService);
    expect(service).toBeTruthy();
  });
});
