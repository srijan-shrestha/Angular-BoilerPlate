import { TestBed } from '@angular/core/testing';

import { UserPlanService } from './user-plan.service';

describe('UserPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPlanService = TestBed.get(UserPlanService);
    expect(service).toBeTruthy();
  });
});
