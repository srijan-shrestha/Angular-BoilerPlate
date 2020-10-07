import { Component, OnInit } from '@angular/core';
import { PageGroupGenericComponent } from '../page-group-generic/page-group-generic.component';
import { PlaybookActiveFormService } from '../../services/playbook-active-form.service';
import { EditorService } from '../../../../shared/services/editor.service';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.scss']
})
export class GrowthComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

}
