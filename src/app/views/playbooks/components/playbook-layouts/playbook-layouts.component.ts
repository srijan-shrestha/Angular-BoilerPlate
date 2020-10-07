import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { PageGroupService } from 'src/app/shared/services/page-group.service';
import { EditorService } from 'src/app/shared/services/editor.service';
import { Editor } from 'src/app/shared/models/editor.model';
import { Layout } from 'src/app/shared/models/playbook-page-layout.model';
import { PageGroup } from 'src/app/shared/models/playbook-page-group.model';
import { PlayBookService } from 'src/app/shared/services/playbook.service';
import { PlayBook } from 'src/app/shared/models/playbook.model';
import { Page } from 'src/app/shared/models/playbook-page.model';

@Component({
  selector: 'app-playbook-layouts',
  templateUrl: './playbook-layouts.component.html',
  styleUrls: ['./playbook-layouts.component.scss']
})
export class PlaybookLayoutsComponent implements OnInit {
  @Input() bottomBarState: 'expanded' | 'normal' | 'hidden' = 'normal';
  @Output() bottomBarStateChanged: EventEmitter<string> = new EventEmitter();

  privateEditor: Editor;

  lastScrollY = 0;

  get editor(): Editor {
    return this.privateEditor;
  }

  set editor(editor: Editor) {
    this.privateEditor = editor;
  }


  pageGroups: PageGroup[];
  playBook: PlayBook;
  page: Page;

  pageLayouts: Layout[];

  constructor(
    private pageGroupService: PageGroupService,
    private editorService: EditorService,
    private playBookService: PlayBookService
  ) {
    this.pageGroupService.pageGroups.subscribe((pageGroups: PageGroup[]) => {
      this.pageGroups = pageGroups;
      this.updatePage();
    });
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.updatePage();
    });
    this.editorService.editor.subscribe((editor: Editor) => {
      this.editor = editor;
      this.updatePage();
    });
  }

  ngOnInit() {
  }

  updatePage() {

    // update page layouts.
    if (!this.editor || !this.playBook.pages) {
      return;
    }
    const page = this.playBook.pages[this.editor.currentPageId];
    if (!page) {
      return;
    }
    this.page = page;
    const pageGroup = this.pageGroups.find((pg: PageGroup) => {
      return pg.id === page.pageGroupId;
    });

    this.pageLayouts = pageGroup.layouts;
  }

  updateLayout(layout: Layout) {
    this.playBookService.updatePageLayout(this.page, layout);
  }

  toggleBottomBarState() {
    if (this.bottomBarState === 'expanded') {
      this.bottomBarStateChanged.emit('normal');
    } else {
      this.bottomBarStateChanged.emit('expanded');
    }
  }

  onLayoutListScroll(event) {
    if ( event.deltaY > 0 && this.bottomBarState === 'normal') {
      this.toggleBottomBarState();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const tempOffset = 10; // Near the end
    if (document.body.offsetHeight + window.scrollY + tempOffset >= document.body.scrollHeight &&
      this.lastScrollY < window.scrollY && this.bottomBarState === 'normal') {
      this.toggleBottomBarState();
    }
    this.lastScrollY = window.scrollY;
  }
}
