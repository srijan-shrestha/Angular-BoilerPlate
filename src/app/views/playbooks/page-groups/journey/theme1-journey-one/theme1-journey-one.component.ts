import { Component, OnInit } from '@angular/core';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { EditorService } from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-journey-one',
  templateUrl: './theme1-journey-one.component.html',
  styleUrls: ['./theme1-journey-one.component.scss']
})
export class Theme1JourneyOneComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

}
