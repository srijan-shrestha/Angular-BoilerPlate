import { TestBed } from '@angular/core/testing';

import { PlaybookActiveFormService } from './playbook-active-form.service';

describe('PlaybookActiveFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaybookActiveFormService = TestBed.get(PlaybookActiveFormService);
    expect(service).toBeTruthy();
  });
});
