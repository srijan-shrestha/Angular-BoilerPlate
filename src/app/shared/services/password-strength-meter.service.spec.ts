import { TestBed } from '@angular/core/testing';

import { PasswordStrengthMeterService } from './password-strength-meter.service';

describe('PasswordStrengthMeterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordStrengthMeterService = TestBed.get(PasswordStrengthMeterService);
    expect(service).toBeTruthy();
  });
});
