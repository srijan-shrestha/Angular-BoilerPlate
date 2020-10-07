import { Component, OnInit } from '@angular/core';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';
import { EditorService } from 'src/app/shared/services/editor.service';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';

@Component({
  selector: 'app-theme1-letter-to-editor1',
  templateUrl: './theme1-letter-to-editor1.component.html',
  styleUrls: ['./theme1-letter-to-editor1.component.scss']
})
export class Theme1LetterToEditor1Component extends PageGroupGenericComponent {

  constructor(
    playbookActiveFormService: PlaybookActiveFormService,
    editorService: EditorService
  ) {
    super(playbookActiveFormService, editorService);
  }
}
