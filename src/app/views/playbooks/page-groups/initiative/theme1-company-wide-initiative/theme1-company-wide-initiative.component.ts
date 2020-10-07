import {Component, OnChanges} from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-company-wide-initiative',
  templateUrl: './theme1-company-wide-initiative.component.html',
  styleUrls: ['./theme1-company-wide-initiative.component.scss']
})
export class Theme1CompanyWideInitiativeComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }
}
