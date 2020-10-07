import { Component, OnInit } from '@angular/core';
import { PlaybookFormGenericComponent } from '../playbook-form-generic/playbook-form-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { PlayBookService } from 'src/app/shared/services/playbook.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-multi-line-text',
  templateUrl: './multi-line-text.component.html',
  styleUrls: ['./multi-line-text.component.scss']
})
export class MultiLineTextComponent  extends PlaybookFormGenericComponent {

  constructor(
    public playbookActiveFormService: PlaybookActiveFormService,
    public playbookService: PlayBookService,
    public fb: FormBuilder
  ) {
    super(playbookActiveFormService, playbookService);
  }

  setData() {
    this.form = this.fb.group({
      text: [this.initialFormData ? this.initialFormData.text : ''],
    });
  }

}
