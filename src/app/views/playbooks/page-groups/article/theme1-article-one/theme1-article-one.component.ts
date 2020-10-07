import { Component, OnInit } from '@angular/core';
import { PlaybookActiveFormService } from '../../../services/playbook-active-form.service';
import { EditorService } from '../../../../../shared/services/editor.service';
import { PageGroupGenericComponent } from '../../page-group-generic/page-group-generic.component';

@Component({
  selector: 'app-theme1-article-one',
  templateUrl: './theme1-article-one.component.html',
  styleUrls: ['./theme1-article-one.component.scss']
})
export class Theme1ArticleOneComponent extends PageGroupGenericComponent {

  constructor(playbookActiveFormService: PlaybookActiveFormService,
              editorService: EditorService) {
    super(playbookActiveFormService, editorService);
  }

}
