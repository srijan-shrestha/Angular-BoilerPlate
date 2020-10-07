import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Editor } from '../models/editor.model';
import { Layout } from '../models/playbook-page-layout.model';
import { PageGroupService } from './page-group.service';
import { PageGroup } from '../models/playbook-page-group.model';
import { PlayBook } from '../models/playbook.model';
import { PlayBookService } from './playbook.service';
import { Page } from '../models/playbook-page.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private editorSource = new BehaviorSubject<Editor>(new Editor());

  editor = this.editorSource.asObservable();

  private pageGroups: PageGroup[];

  private playBook: PlayBook;

  constructor(
    private pageGroupService: PageGroupService,
    private playBookService: PlayBookService
  ) {
    this.pageGroupService.pageGroups.subscribe((pageGroups: PageGroup[]) => {
      this.pageGroups = pageGroups;
    });
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
    });
  }

  setEditorData(editor: Editor) {
    this.editorSource.next(editor);
  }

  resetEditorData() {
    this.editorSource.next(new Editor());
  }

  getCurrentPage(): Page {
    const e = this.editorSource.getValue();
    if (!e.currentPageId || !this.playBook.pages) {
      return;
    }
    return this.playBook.pages[e.currentPageId];
  }

  updateCurrentPage(page: Page, isSaving: boolean = false) {
    this.playBookService.updatePage(page, isSaving);
  }

  updatePlaybookDetail(detail: PlayBook, isSaving: boolean = false) {
    this.playBookService.updatePlaybookDetail(detail, isSaving);
  }

  updatePlaybook(playbook: PlayBook) {
    this.playBookService.updatePlaybookData(playbook);
  }
  // updatePageLayout(layout: Layout) {
  //   const editor = this.editorSource.getValue();
  //   this.editorSource.next({
  //     ...editor,
  //     currentPage: {
  //       ...editor.currentPage,
  //       layout,
  //       title: 'asdkfj;asdjf'
  //     }
  //   });
  // }

  // setRandomPage() {
  //   const playbooks = this.playbookSource.getValue();
  //   this.playbookSource.next({
  //     ...playbooks,
  //     pageLinks: [
  //       ...playbooks.pageLinks,
  //       {
  //         type: 'link',
  //         pages: [{
  //           pageGroup: {
  //             title: 'frontcover'
  //           },
  //           title: Math.random().toString(),
  //           layout: {
  //             pageGroup: {
  //               title: 'frontcover'
  //             },
  //             title: 'Front Cover',
  //             image: ''
  //           }
  //         }]
  //       },
  //     ]
  //   });
  //   // console.log(this.playbookSource.value.)
  // }

}
