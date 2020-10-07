import { TestBed } from '@angular/core/testing';

import { PlaybookImagesService } from './playbook-images.service';

describe('PlaybookImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaybookImagesService = TestBed.get(PlaybookImagesService);
    expect(service).toBeTruthy();
  });
});
