import {FormControl} from '@angular/forms';


export function validateEmailPattern(control: FormControl) {

  // tslint:disable-next-line: max-line-length
  const  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (control.value === null || control.value === undefined || control.value === '') {
    return null;
  }
  if (emailPattern.test(control.value)) {
    return  null;
  }
  return {
    fieldError: 'Invalid email address'
  };
}
