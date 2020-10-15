import {FormControl} from '@angular/forms';

export function validatePhonePattern(control: FormControl) {
  const localPhonePattern = /^[\0-9]{3}[\s\-]?[0-9]{4}$/;
  const domesticPhonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const internationalPhonePattern = /^\+1\-\d{3}\-\d{3}\-\d{4}$/;
  if (control.value === null || control.value === undefined || control.value === '') {
    return null;
  }
  if (domesticPhonePattern.test(control.value) ||
  internationalPhonePattern.test(control.value)) {
    return  null;
  }
  return {
    fieldError: 'Invalid Phone number'
  };
}
