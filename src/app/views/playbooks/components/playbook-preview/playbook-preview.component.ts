import {Component, Input, OnInit} from '@angular/core';
import {PlayBook} from '../../../../shared/models/playbook.model';
import {PlayBookService} from '../../../../shared/services/playbook.service';
import {EditorService} from '../../../../shared/services/editor.service';
import {Editor} from '../../../../shared/models/editor.model';
import {Page} from '../../../../shared/models/playbook-page.model';
import {Theme} from '../../models/themes';
import {PageLink} from '../../../../shared/models/playbook-page-link.model';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-playbook-preview',
  templateUrl: './playbook-preview.component.html',
  styleUrls: ['./playbook-preview.component.scss']
})
export class PlaybookPreviewComponent implements OnInit {
  playBook: PlayBook;
  editor: Editor;
  page: Page;
  @Input() theme: Theme;
  pageLinks: PageLink[];
  pages: any;

  constructor(private playBookService: PlayBookService,
              private editorService: EditorService,
              public ngModal: NgbModal,
  ) {
  }

  ngOnInit() {
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.pageLinks = playBook.pageLinks;
      this.pages = playBook.pages;
      this.updateCurrentPage();
    });
    this.editorService.editor.subscribe((editor: Editor) => {
      this.editor = editor;
      this.updateCurrentPage();
    });
  }

  updateCurrentPage() {
    if (this.editor) {
      this.page = this.editorService.getCurrentPage();

      // Fallback for playbook listing page
      // preview
      if (!this.page) {
        const pages = this.playBookService.getPagesArray();
        if (pages[0]) {
          this.updateCurrentPageModal(pages[0]);
        }
      }
    }
  }

  updateCurrentPageModal(pageId: string) {
    let pageNumber = 0;
    for (const link of this.pageLinks) {
      const idx = link.pages.indexOf(pageId);
      if (idx !== -1) {
        pageNumber += idx;
        break;
      } else {
        pageNumber += link.pages.length;
      }
    }
    this.editorService.setEditorData({
      ...this.editor,
      currentPageId: pageId,
      currentPageNumber: pageNumber
    });
  }

  updateNextPrev(isNext) {
    const pages = this.playBookService.getPagesArray();
    const totalPages = pages.length;
    const currentPageId = this.editor.currentPageId;

    let pageId = null;
    if (isNext) {
      //  if (pageId === undefined) {
      //   pageId = pages[totalPages - 1];
      // }
      pageId = pages[(pages.indexOf(currentPageId) + 1) % totalPages];

    } else {
      //  if (pageId === undefined) {
      //   pageId = pages[totalPages - 1];
      // }
      pageId = pages[(pages.indexOf(currentPageId) - 1 + totalPages) % totalPages];
    }
    this.updateCurrentPageModal(pageId);
  }

}
