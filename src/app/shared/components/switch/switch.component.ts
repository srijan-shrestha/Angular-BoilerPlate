import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, AbstractControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => SwitchComponent),
    //   multi: true
    // }
  ]
})
export class SwitchComponent implements OnInit {
  @Input() formControlName: string;

  @Input() id = '';
  @Input() disableInput = false;

  private privateInputValue;

  defaultValidator: any;
  shouldValidate = true;
  @Input() disableValidation = false;

  control: AbstractControl;

  @Output() changed: EventEmitter<any> = new EventEmitter();

  get inputValue() {
    return this.privateInputValue;
  }

  @Input()
  set inputValue(val) {
    this.privateInputValue = val;
    this.propagateChange(val);
    this.stopValidation();
  }

  constructor(
    private controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
        const validator = this.control.validator && this.control.validator({} as AbstractControl);
        this.defaultValidator = validator || {};
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }

  }

  onChange(event) {
    event.srcElement.blur();
    event.preventDefault();
    this.changed.emit(event);
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
    // this.shouldValidate = !(this.inputValue === '' && !('required' in this.defaultValidator));
  }

  // Set touched on blur
  onBlur() {
    this.beginValidation();
    this.onTouchedCallback();
  }

  stopValidation() {
    this.shouldValidate = false;
  }

  // validate(c: AbstractControl) {
  //   if (this.disableValidation) {
  //     return null;
  //   }
  // }
}
