import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeService = TestBed.get(ThemeService);
    expect(service).toBeTruthy();
  });
});
