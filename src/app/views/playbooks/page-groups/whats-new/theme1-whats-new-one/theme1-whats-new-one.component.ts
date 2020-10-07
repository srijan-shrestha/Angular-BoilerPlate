import {Component} from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-whats-new-one',
  templateUrl: './theme1-whats-new-one.component.html',
  styleUrls: ['./theme1-whats-new-one.component.scss']
})
export class Theme1WhatsNewOneComponent extends PageGroupGenericComponent {
  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }

}
