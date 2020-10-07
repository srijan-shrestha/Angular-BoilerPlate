import { TestBed } from '@angular/core/testing';

import { PlayBookService } from './playbook.service';

describe('PlayBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayBookService = TestBed.get(PlayBookService);
    expect(service).toBeTruthy();
  });
});
