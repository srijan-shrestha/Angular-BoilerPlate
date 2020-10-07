import { Component, OnInit, forwardRef, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, AbstractControl, ControlContainer } from '@angular/forms';
import { PasswordStrengthMeterService } from '../../services/password-strength-meter.service';
import { MaskApplierService } from 'ngx-mask/app/ngx-mask/mask-applier.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit {
  attrType = 'text';
  @Input() maskData: any;
  @Input() theme: 'light' | 'dark' = 'light';

  @Input() formControlName: string;
  @Input() formControl: FormControl;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() align: 'left' | 'center' | 'right' = 'left';

  @Input() type: string;

  @Input() accept: string;
  @Input() fixedHeight: boolean;

  @Input() id = '';
  @Input() maxCharLength: any;

  private _inputValue;
  // @Input('inputValue') _inputValue = '';
  get inputValue() {
    return this._inputValue;
  }

  @Input()
  set inputValue(val) {
    this._inputValue = val;
    try {
      this.propagateChange(val);
    } catch (e) { }
    this.stopValidation();
    if (this.attrType === 'file' && (val === '' || !val)) {
      this.fileLabel = '';
    }
  }

  @Input() placeholder = '';

  @Input() disabled = false;

  @Input() disableValidation = false;

  @Input() autocomplete = true;

  @Input() readonly = false;

  @Input() inputGroupPrepend = null;

  @Input() inputGroupAppend = null;

  @Output() change: EventEmitter<any> = new EventEmitter();

  control: AbstractControl;

  fileLabel = '';
  defaultValidator: any;

  @Input() shouldValidate = true;



  constructor(
    private controlContainer: ControlContainer,
    private passwordStrengthMeterService: PasswordStrengthMeterService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get('' + this.formControlName);
        const validator = this.control.validator && this.control.validator({} as AbstractControl);
        this.defaultValidator = validator || {};
      } else if (this.formControl) {
        this.control = this.formControl;
        const validator = this.control.validator && this.control.validator({} as AbstractControl);
        this.defaultValidator = validator || {};
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }

    if (this.type === 'workspace') {
      this.attrType = 'text';
    }

    if (this.type === 'name') {
      this.attrType = 'text';
    }

    if (this.type === 'phone') {
      this.attrType = 'text';
    }

    if (this.type === 'email') {
      this.attrType = 'text';
    }

    if (this.type === 'latitude') {
      this.attrType = 'number';
    }

    if (this.type === 'longitude') {
      this.attrType = 'number';
    }

    if (this.type === 'zipcode') {
      this.attrType = 'number';
    }

    if (this.type === 'number') {
      this.attrType = 'number';
    }

    if (this.type === 'date') {
      this.attrType = 'date';
    }

    if (this.type === 'password' || this.type === 'repassword') {
      this.attrType = 'password';
    }

    if (this.type === 'day') {
      this.attrType = 'number';
    }
    if (this.type === 'textarea') {
      this.attrType = 'textarea';
    }
    if (this.type === 'time') {
      this.attrType = 'time';
    }
    if(this.type === 'decimal' || this.type === 'integer') {
      this.attrType = 'text';
    }
  }

  onChange(event) {
    this.change.emit(event);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  propagateChange = (_: any) => { };

  onTouchedCallback = () => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  beginValidation() {
    this.shouldValidate = !(this.inputValue === '' && !('required' in this.defaultValidator));
  }

  // Set touched on blur
  onBlur() {
    this.beginValidation();
    this.onTouchedCallback();
  }

  stopValidation() {
    this.shouldValidate = false;
  }


  validate(c: AbstractControl) {
    if (this.disableValidation) {
      return null;
    }

    switch (this.type) {
      case 'password': {
        // // TODO validation logic optimization
        // if (!this.password) {
        //   this.passwordStrength = null;
        // } else if (this.password && this.password.length < this.minPasswordLength) {
        // // } else if (this.password && this.password.length < this.minPasswordLength) {
        //   this.passwordStrength = 0;
        // } else {
        //   if (this.enableFeedback) {
        //     const result = this.passwordStrengthMeterService.scoreWithFeedback(
        //       this.password
        //     );
        //     this.passwordStrength = result.score;
        //     this.feedback = result.feedback;
        //   } else {
        //     this.passwordStrength = this.passwordStrengthMeterService.score(
        //       this.password
        //     );
        //     this.feedback = null;
        //   }
        // }


        const result = this.passwordStrengthMeterService.scoreWithFeedback(
          c.value
        );

        if (!result.score) {
          return {
            fieldError: [result.feedback.warning]
          };
        }





        // if (!this.defaultValidator.required && c.value === '') {
        //   return null;
        // }

        // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(c.value)) {
        //   return {
        //     fieldError: 'Enter a strong password with minimum eight characters, at least one letter, one number and one special character.'
        //   };
        // }
        break;
      }
      case 'workspace': {
        if (c.value && c.value.length < 2) {
          return {
            fieldError: ['Workspace name is too short']
          };
        }
        if (c.value && c.value.length > 30) {
          return {
            fieldError: ['Workspace name is too long']
          };
        }
        break;
      }
      case 'name': {
        if (c.value && c.value.length >= 100) {
          return {
            fieldError: ['Name is too long.']
          };
        }
        break;
      }
      case 'phone': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(\+)?(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid phone number.']
          };
        }
        break;
      }
      case 'email': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid email.']
          };
        }
        break;
      }
      case 'excel': {
        if (!c.value) {
          return null;
        }
        const allowedExtensions = ['xls', 'xlsx'];
        const extension = c.value.split('.').pop();
        if (allowedExtensions.indexOf(extension) === -1) {
          return {
            fieldError: ['Invalid file format. Please upload xls or xlsx format.']
          };
        }
        break;
      }
      case 'latitude': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid latitude data.']
          };
        }

        return null;
      }
      case 'longitude': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid longitude data.']
          };
        }
        return null;
      }
      case 'day': {
        const isNum = !isNaN(c.value);
        if (!isNum || (isNum && +c.value < 0)) {
          return {
            fieldError: ['Enter a valid day.']
          };
        }
        return null;
      }
      case 'pdf': {
        if (!c.value) {
          return null;
        }
        const allowedExtensions = ['pdf'];
        const extension = c.value.split('.').pop();
        if (allowedExtensions.indexOf(extension) === -1) {
          return {
            fieldError: ['Invalid file format. Please upload PDF format.']
          };
        }
        break;
      }

      case 'zipcode': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid US zip code.']
          };
        }
        break;
      }
      case 'creditCard': {
        if (!this.defaultValidator.required) {
          return null;
        }
        // tslint:disable-next-line:max-line-length
        if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid Credit Card.']
          };
        }
        break;
      }
      case 'cvv': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^[0-9]{3,4}$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid CVV']
          };
        }
        break;
      }
      case 'creditCardExpirationDate': {
        // The date is masked in MM/YY format.
        // So, / masked is added by the masked
        // and removed on final output value to MMYY
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(0[1-9]|1[0-2])[0-9]{2}$/.test(c.value)) {
          return {
            fieldError: ['Date Must be in MM/YY format']
          };
        }
        break;
      }
      case 'decimal': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^(\d*\.)?\d+$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid decimal number.']
          };
        }
        return null;
      }
      case 'integer': {
        if (!this.defaultValidator.required) {
          return null;
        }
        if (!/^[0-9]*$/.test(c.value)) {
          return {
            fieldError: ['Enter a valid integer.']
          };
        }
        return null;
      }
    }
  }

  focus() {
    let input = this.el.nativeElement.getElementsByTagName('input');
    if (input.length < 1) {
      input = this.el.nativeElement.getElementsByTagName('textarea');
    }

    if (input.length > 0) {
      // console.log(input[0]);
      input[0].focus();
    }
  }
}
