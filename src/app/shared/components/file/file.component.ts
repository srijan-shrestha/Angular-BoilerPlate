import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlContainer, AbstractControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileComponent),
      multi: true
    }
  ]
})
export class FileComponent implements OnInit {
  attrType = 'text';
  control: AbstractControl;
  shouldValidate = true;
  fileLabel = '';
  defaultImage: any;

  @Input() disableValidation = false;
  defaultValidator: any;
  @Input() type: string;
  @Input() autocomplete = true;
  @Input() disabled = false;
  @Input() accept: string;
  @Input() id = '';
  @Input() imgURL: any;

  @Input() formControlName: string;
  @Input() label: string;
  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() data: EventEmitter<any> = new EventEmitter();


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
    if (this.attrType === 'file' && (val === '' || !val)) {
      this.fileLabel = '';
    }
  }
  propagateChange = (_: any) => { };


  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    if (!this.imgURL) {
      this.defaultImage = '/assets/user.png';
    }
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
    if (this.type === 'excel') {
      this.attrType = 'file';
    }

    if (this.type === 'pdf') {
      this.attrType = 'file';
    }
    if (this.type === 'profile') {
      this.attrType = 'file';
    }
  }

  onChange(event) {
    if (this.attrType === 'file') {
      const file = (event.target as HTMLInputElement).files[0];
      if (file) {
        this.fileLabel = file.name;
        this.data.emit(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =(_event) => {
          this.imgURL = reader.result;
        };
      } else {
        this.fileLabel = '';
      }
    }
    this.changed.emit(event);
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

  validate(c: AbstractControl) {
    if (this.disableValidation) {
      return null;
    }

    switch (this.type) {

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
      case 'profile': {
        if (!c.value) {
          return null;
        }
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const extension = c.value.split('.').pop();
        if (allowedExtensions.indexOf(extension) === -1) {
          return {
            fieldError: ['Invalid file format. Please upload jpg, jpeg and png format.']
          };
        }
        break;
      }


    }
  }


}
