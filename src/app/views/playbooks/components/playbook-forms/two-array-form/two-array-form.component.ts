import { Component } from '@angular/core';
import { PlaybookFormGenericComponent } from '../playbook-form-generic/playbook-form-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { PlayBookService } from '../../../../../shared/services/playbook.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-two-array-form',
  templateUrl: './two-array-form.component.html',
  styleUrls: ['./two-array-form.component.scss']
})
export class TwoArrayFormComponent extends PlaybookFormGenericComponent {

  constructor(public playbookActiveFormService: PlaybookActiveFormService,
              public playbookService: PlayBookService,
              public fb: FormBuilder) {
    super(playbookActiveFormService, playbookService);
  }

  setData() {
    this.form = this.fb.group({
      textInfo: this.initialFormData && this.initialFormData.textInfo && this.initialFormData.textInfo.length
        ? this.fb.array(this.initialFormData.textInfo.map(value => this.createText({ text1: value.text1, text2: value.text2 })))
        : this.fb.array([this.createText({ text1: '', text2: '' })])
    });
  }

  get texts() {
    return this.form.get('textInfo') as FormArray;
  }

  createText(value: { text1: string, text2: string }) {
    return this.fb.group({
      text1: [value && value.text1 ? value.text1 : '', []],
      text2: [value && value.text2 ? value.text2 : '', []]
    });
  }

  addText() {
    this.texts.push(this.createText({ text1: '', text2: '' }));
  }

}
