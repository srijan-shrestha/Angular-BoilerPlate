import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {PlaybookFormGenericComponent} from '../playbook-form-generic/playbook-form-generic.component';
import {PlayBookService} from '../../../../../shared/services/playbook.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent extends PlaybookFormGenericComponent {

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
    });
  }

}
