import { Component, OnInit } from '@angular/core';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { EditorService } from 'src/app/shared/services/editor.service';

@Component({
  selector: 'app-theme1-article-three',
  templateUrl: './theme1-article-three.component.html',
  styleUrls: ['./theme1-article-three.component.scss']
})
export class Theme1ArticleThreeComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }
}
