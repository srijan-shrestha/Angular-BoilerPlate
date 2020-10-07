import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PlaybookFormGenericComponent} from '../playbook-form-generic/playbook-form-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {PlayBookService} from '../../../../../shared/services/playbook.service';

@Component({
  selector: 'app-toc-form',
  templateUrl: './toc-form.component.html',
  styleUrls: ['./toc-form.component.scss']
})
export class TocFormComponent extends PlaybookFormGenericComponent {

  constructor(
    public playbookActiveFormService: PlaybookActiveFormService,
    public playbookService: PlayBookService,
    public fb: FormBuilder
  ) {
    super(playbookActiveFormService, playbookService);
  }

  setData() {
    this.form = this.fb.group({
      toc1Title: [this.initialFormData ? this.initialFormData.toc1Title : ''],
      toc1Page: [this.initialFormData ? this.initialFormData.toc1Page : ''],
      toc2Title: [this.initialFormData ? this.initialFormData.toc2Title : ''],
      toc2Page: [this.initialFormData ? this.initialFormData.toc2Page : ''],
      toc3Title: [this.initialFormData ? this.initialFormData.toc3Title : ''],
      toc3Page: [this.initialFormData ? this.initialFormData.toc3Page : ''],
      toc4Title: [this.initialFormData ? this.initialFormData.toc4Title : ''],
      toc4Page: [this.initialFormData ? this.initialFormData.toc4Page : ''],
      toc5Title: [this.initialFormData ? this.initialFormData.toc5Title : ''],
      toc5Page: [this.initialFormData ? this.initialFormData.toc5Page : ''],
      toc6Title: [this.initialFormData ? this.initialFormData.toc6Title : ''],
      toc6Page: [this.initialFormData ? this.initialFormData.toc6Page : ''],
      toc7Title: [this.initialFormData ? this.initialFormData.toc7Title : ''],
      toc7Page: [this.initialFormData ? this.initialFormData.toc7Page : ''],
      toc8Title: [this.initialFormData ? this.initialFormData.toc8Title : ''],
      toc8Page: [this.initialFormData ? this.initialFormData.toc8Page : ''],
    });
  }

}
