import {Component} from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-business-development-two',
  templateUrl: './theme1-business-development-two.component.html',
  styleUrls: ['./theme1-business-development-two.component.scss']
})
export class Theme1BusinessDevelopmentTwoComponent extends PageGroupGenericComponent {

  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }

}
