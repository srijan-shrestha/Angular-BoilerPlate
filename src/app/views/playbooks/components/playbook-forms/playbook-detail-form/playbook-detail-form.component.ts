import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { PlayBookService } from '../../../../../shared/services/playbook.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs";
import { EditorService } from "../../../../../shared/services/editor.service";
import { ActiveForm } from "../../../models/active-form.model";
import { PlaybookFormGenericComponent } from "../playbook-form-generic/playbook-form-generic.component";

@Component({
  selector: 'app-playbook-detail-form',
  templateUrl: './playbook-detail-form.component.html',
  styleUrls: ['./playbook-detail-form.component.scss']
})
export class PlaybookDetailFormComponent extends PlaybookFormGenericComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  playbookActiveForm = undefined;

  constructor(public playbookActiveFormService: PlaybookActiveFormService,
              public playbookService: PlayBookService,
              public fb: FormBuilder,
              private editorService: EditorService) {
    super(playbookActiveFormService, playbookService);
  }

  ngOnInit() {
    this.subscription = this.playbookActiveFormService.activeForm.subscribe((playbookActiveForm: ActiveForm) => {
      this.playbookActiveForm = playbookActiveForm;
      if (playbookActiveForm.code === 'playbook-detail') {
        this.editorService.updatePlaybookDetail(playbookActiveForm.formData, this.playbookActiveForm.saving);
      }
    });
  }

  setData() {
    this.form = this.fb.group({
      title: [this.initialFormData ? this.initialFormData.title : ''],
    });
  }

  ngOnDestroy() {
    this.playbookActiveFormService.clear();
    this.subscription.unsubscribe();
  }

}
