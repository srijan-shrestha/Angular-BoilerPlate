import { Injectable, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  isValid(formGroup: FormGroup, elForm: ElementRef, focusErrorField = true): boolean {
    if (formGroup.invalid) {
      const invalidElements = elForm.nativeElement.querySelectorAll('.ng-invalid');
      if (invalidElements.length > 0) {
        invalidElements[0].firstElementChild.focus();
      }
      return false;
    }
    return true;
  }
}
