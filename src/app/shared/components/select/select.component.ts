import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit {

  control: AbstractControl;
  shouldValidate = true;
  @Input() disableValidation = false;
  @Input() placeholder: any;
  defaultValidator: any;
  @Input() disabled = false;
  @Input() formControlName: string;
  @Input() size = 'md';

  @Output() change: EventEmitter<any> = new EventEmitter();

  private _inputValue;
  // @Input('inputValue') _inputValue = '';
  get inputValue() {
    return this._inputValue;
  }

  @Input()
  set inputValue(val) {
    this._inputValue = val;
    this.propagateChange(val);
    this.stopValidation();
  }

  propagateChange = (_: any) => { };

  constructor(private controlContainer: ControlContainer) { }

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

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onBlur() {
    this.beginValidation();
    this.onTouchedCallback();
  }
  onTouchedCallback = () => {};

  beginValidation() {
    this.shouldValidate = !(this.inputValue === '' && !('required' in this.defaultValidator));
  }

  stopValidation() {
    this.shouldValidate = false;
  }

  onChange(event) {
    this.change.emit(event);
  }

  validate(c: AbstractControl) {
    if (this.disableValidation) {
      return null;
    }
  }


}
