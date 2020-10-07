import {Component, OnChanges} from '@angular/core';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from 'src/app/shared/services/editor.service';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';

@Component({
  selector: 'app-mission-statement-company-values',
  templateUrl: './mission-statement-company-values.component.html',
  styleUrls: ['./mission-statement-company-values.component.scss']
})
export class MissionStatementCompanyValuesComponent extends PageGroupGenericComponent implements OnChanges {
  data: any;

  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }

  ngOnChanges() {
    if (this.page.data) {
      if (this.page.data.values) {
        this.data = Object.entries(this.page.data.values);
      }
    }
  }
}
