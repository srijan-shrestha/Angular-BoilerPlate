import { TestBed } from '@angular/core/testing';

import { PageGroupService } from './page-group.service';

describe('PageGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageGroupService = TestBed.get(PageGroupService);
    expect(service).toBeTruthy();
  });
});
