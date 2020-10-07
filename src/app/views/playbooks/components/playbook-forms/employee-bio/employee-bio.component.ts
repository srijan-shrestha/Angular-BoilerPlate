import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlaybookFormGenericComponent } from '../playbook-form-generic/playbook-form-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import {PlayBookService} from '../../../../../shared/services/playbook.service';

@Component({
  selector: 'app-employee-bio',
  templateUrl: './employee-bio.component.html',
  styleUrls: ['./employee-bio.component.scss']
})
export class EmployeeBioComponent extends PlaybookFormGenericComponent {

  constructor(
    public playbookActiveFormService: PlaybookActiveFormService,
    public playbookService: PlayBookService,
    public fb: FormBuilder
  ) {
    super(playbookActiveFormService, playbookService);
  }

  setData() {
    this.form = this.fb.group({
      imageid: [this.initialFormData ? this.initialFormData.imageid : ''],
      imageurl: [this.initialFormData ? this.initialFormData.imageurl : ''],
      name: [this.initialFormData ? this.initialFormData.name : ''],
      department: [this.initialFormData ? this.initialFormData.department : ''],
      position: [this.initialFormData ? this.initialFormData.position : ''],
      bio: [this.initialFormData ? this.initialFormData.bio : '']
    });
  }
}
