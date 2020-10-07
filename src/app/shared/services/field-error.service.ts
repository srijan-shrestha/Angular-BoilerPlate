import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FieldErrorService {

  constructor() { }

  private fieldLoop(form: FormGroup | FormControl | AbstractControl, fieldErrors: any) {
    if (Array.isArray(fieldErrors)) {
      (form as FormControl).setErrors({
        fieldError: fieldErrors
      });
    } else {
      for (const key in fieldErrors) {
        if (key === 'nonFieldError') {
          this.fieldLoop(undefined, fieldErrors[key]);
        } else {
          this.fieldLoop(form.get(key), fieldErrors[key]);
        }
      }
    }
  }

  check(formGroup: FormGroup, err: HttpErrorResponse) {
    if (err && err.status === 400) {
      this.fieldLoop(formGroup, err.error);
    }
  }
}
