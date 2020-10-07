import {Component} from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-theme1-goal-one',
  templateUrl: './theme1-goal-one.component.html',
  styleUrls: ['./theme1-goal-one.component.scss']
})
export class Theme1GoalOneComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

}

