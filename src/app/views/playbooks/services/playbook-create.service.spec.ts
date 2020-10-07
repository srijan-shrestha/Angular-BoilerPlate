import { TestBed } from '@angular/core/testing';

import { PlaybookCreateService } from './playbook-create.service';

describe('PlaybookCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaybookCreateService = TestBed.get(PlaybookCreateService);
    expect(service).toBeTruthy();
  });
});
