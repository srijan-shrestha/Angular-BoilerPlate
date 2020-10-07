import { TestBed } from '@angular/core/testing';

import { FindWorkspaceService } from './find-workspace.service';

describe('FindWorkspaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindWorkspaceService = TestBed.get(FindWorkspaceService);
    expect(service).toBeTruthy();
  });
});
