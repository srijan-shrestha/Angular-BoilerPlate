import { TestBed } from '@angular/core/testing';

import { GlobalDropdownService } from './global-dropdown.service';

describe('GlobalDropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalDropdownService = TestBed.get(GlobalDropdownService);
    expect(service).toBeTruthy();
  });
});
