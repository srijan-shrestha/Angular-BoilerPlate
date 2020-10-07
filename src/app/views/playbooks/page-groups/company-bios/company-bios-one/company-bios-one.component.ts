import { Component, OnInit } from '@angular/core';
import {PageGroupGenericComponent} from '../../page-group-generic/page-group-generic.component';
import {PlaybookActiveFormService} from '../../../services/playbook-active-form.service';
import {EditorService} from '../../../../../shared/services/editor.service';

@Component({
  selector: 'app-company-bios-one',
  templateUrl: './company-bios-one.component.html',
  styleUrls: ['./company-bios-one.component.scss']
})
export class CompanyBiosOneComponent extends PageGroupGenericComponent {
  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }


}
