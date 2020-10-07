import {Component} from '@angular/core';
import {PlaybookFormGenericComponent} from '../playbook-form-generic/playbook-form-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {PlayBookService} from '../../../../../shared/services/playbook.service';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-array-form',
  templateUrl: './array-form.component.html',
  styleUrls: ['./array-form.component.scss']
})
export class ArrayFormComponent extends PlaybookFormGenericComponent {

  constructor(
    public playbookActiveFormService: PlaybookActiveFormService,
    public playbookService: PlayBookService,
    public fb: FormBuilder
  ) {
    super(playbookActiveFormService, playbookService);
  }

  setData() {
    this.form = this.fb.group({
      texts: this.initialFormData && this.initialFormData.texts && this.initialFormData.texts.length
        ? this.fb.array(this.initialFormData.texts.map((value: string) => {
          return this.createText(value);
        }))
        : this.fb.array([this.createText('')])
    });
  }

  get texts() {
    return this.form.get('texts') as FormArray;
  }

  createText(value) {
    return this.fb.control(value);
  }

  addText() {
    this.texts.push(this.createText(''));
  }

}
