import { TestBed } from '@angular/core/testing';

import { FieldErrorService } from './field-error.service';

describe('FieldErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldErrorService = TestBed.get(FieldErrorService);
    expect(service).toBeTruthy();
  });
});
