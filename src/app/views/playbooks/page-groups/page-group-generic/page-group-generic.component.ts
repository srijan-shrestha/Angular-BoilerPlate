import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Page} from 'src/app/shared/models/playbook-page.model';
import {PlayBook} from 'src/app/shared/models/playbook.model';
import {Subscription} from 'rxjs';
import {EditorService} from 'src/app/shared/services/editor.service';
import {PlaybookActiveFormService} from '../../services/playbook-active-form.service';
import {ActiveForm} from '../../models/active-form.model';

@Component({
  selector: 'app-page-group-generic',
  templateUrl: './page-group-generic.component.html',
  styleUrls: ['./page-group-generic.component.scss']
})
export class PageGroupGenericComponent implements OnInit, OnDestroy {
  @Input() page: Page;
  @Input() playBook: PlayBook;
  @Input() enableClickBtn = true;
  selectedElement: string;
  playbookActiveForm = undefined;
  subscription: Subscription;
  subscriptionEditor: Subscription;
  pageNumber: number;


  constructor(
    private playbookActiveFormService: PlaybookActiveFormService,
    private editorService: EditorService
  ) {
  }

  ngOnInit() {
    this.subscription = this.playbookActiveFormService.activeForm.subscribe((playbookActiveForm: ActiveForm) => {
      this.playbookActiveForm = playbookActiveForm;
      if (playbookActiveForm.code && this.selectedElement && playbookActiveForm.code !== 'playbook-detail') {
        this.editorService.updateCurrentPage({
          ...this.page,
          data: {
            ...this.page.data,
            [this.selectedElement]: playbookActiveForm.formData
          }
        }, this.playbookActiveForm.saving);
      }
    });
    this.subscriptionEditor = this.editorService.editor.subscribe(data => {
      this.pageNumber = data.currentPageNumber;
    });
  }

  ngOnDestroy() {
    this.playbookActiveFormService.clear();
    this.subscription.unsubscribe();
    this.subscriptionEditor.unsubscribe();
  }

  loadForm(code: string, selectedElement: string, event ?: Event) {
    this.selectedElement = selectedElement;
    const data = this.page.data[selectedElement];
    this.playbookActiveFormService.setActiveFormCodeData(code, this.page.data[selectedElement]);
    if (event) {
      event.stopPropagation();
    }
  }
}
