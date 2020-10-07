import {Component, OnChanges} from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-top-initiatives',
  templateUrl: './top-initiatives.component.html',
  styleUrls: ['./top-initiatives.component.scss']
})
export class TopInitiativesComponent extends PageGroupGenericComponent implements OnChanges {
  plans: object;
  title: string;

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

  ngOnChanges() {
    if (this.page.data.title) {
      this.title = this.page.data.title;
    }

    if (this.page.data.plans)
      this.plans = this.page.data.plans;
  }

}
