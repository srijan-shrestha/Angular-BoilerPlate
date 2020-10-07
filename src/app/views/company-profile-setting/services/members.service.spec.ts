import { TestBed } from '@angular/core/testing';

import { MembersService } from './members.service';

describe('InviteMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersService = TestBed.get(MembersService);
    expect(service).toBeTruthy();
  });
});
