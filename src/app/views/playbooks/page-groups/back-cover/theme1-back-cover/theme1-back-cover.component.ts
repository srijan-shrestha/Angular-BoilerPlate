import { Component, OnInit } from '@angular/core';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { EditorService } from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-back-cover',
  templateUrl: './theme1-back-cover.component.html',
  styleUrls: ['./theme1-back-cover.component.scss']
})
export class Theme1BackCoverComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

}
