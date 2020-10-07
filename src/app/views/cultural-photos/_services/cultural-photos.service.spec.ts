import { TestBed } from '@angular/core/testing';

import { CulturalPhotosService } from './cultural-photos.service';

describe('CulturalPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CulturalPhotosService = TestBed.get(CulturalPhotosService);
    expect(service).toBeTruthy();
  });
});
