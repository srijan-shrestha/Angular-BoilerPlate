import { Component } from '@angular/core';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { EditorService } from 'src/app/shared/services/editor.service';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';

@Component({
  selector: 'app-theme1-toc1',
  templateUrl: './theme1-toc1.component.html',
  styleUrls: ['./theme1-toc1.component.scss']
})
export class Theme1Toc1Component extends PageGroupGenericComponent {

  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }
}
