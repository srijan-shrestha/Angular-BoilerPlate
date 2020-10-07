import { TestBed } from '@angular/core/testing';

import { ProfilePicService } from './profile-pic.service';

describe('ProfilePicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilePicService = TestBed.get(ProfilePicService);
    expect(service).toBeTruthy();
  });
});
