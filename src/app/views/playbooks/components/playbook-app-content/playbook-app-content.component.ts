import {Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PlayBook} from 'src/app/shared/models/playbook.model';
import {Page} from 'src/app/shared/models/playbook-page.model';
import {PageGroupService} from 'src/app/shared/services/page-group.service';
import {PageGroup} from 'src/app/shared/models/playbook-page-group.model';
import {Layout} from 'src/app/shared/models/playbook-page-layout.model';
import {Theme} from '../../models/themes';
import {PlayBookService} from 'src/app/shared/services/playbook.service';
import {Editor} from 'src/app/shared/models/editor.model';
import {PageLink} from '../../../../shared/models/playbook-page-link.model';
import {EditorService} from 'src/app/shared/services/editor.service';

@Component({
  selector: 'app-playbook-app-content',
  templateUrl: './playbook-app-content.component.html',
  styleUrls: ['./playbook-app-content.component.scss']
})
export class PlaybookAppContentComponent implements OnInit, OnDestroy {
  @Input() bottombarState: 'expanded' | 'normal' | 'hidden' = 'normal';
  @Input() theme: Theme;
  @Input() showSideBar = true;
  @Input() showPrevNextBtn = false;
  @Input() enableClickBtn = true;

  playBook: PlayBook;
  editor: Editor;
  pageGroup: PageGroup;
  layout: Layout;
  pageLinks: PageLink[];
  private privatePage: Page;

  // @ViewChild("pageContainer", { read: ViewContainerRef, static: true }) pageContainer;
  // @ContentChild(TemplateRef, {static: true}) pageContainer;
  // @ViewChild('pageContainer', {static: true}) pageContainer : TemplateRef<any>

  @ViewChild('themeContainer', {read: ViewContainerRef, static: true}) container;
  componentRef: ComponentRef<any>;

  get page() {
    return this.privatePage;
  }

  @Input()
  set page(p: Page) {
    this.privatePage = p;
    if (p) {
      this.pageGroup = this.pageGroupService.getPageGroup(p.pageGroupId);
      if (this.pageGroup) {
        this.layout = this.pageGroup.layouts.find((layout: Layout) => {
          return layout.id === p.layoutId;
        });
      }
    }
  }

  // pageGroup: string; // = 'cover';

  // pageLayout: string; // = 'cover-one-column';

  constructor(private pageGroupService: PageGroupService,
              private playBookService: PlayBookService,
              private editorService: EditorService,
              // private resolver: ComponentFactoryResolver
  ) {
    // this.pageGroupService.pageGroups.subscribe((pageGroups: PageGroup[]) => {
    //   this.pageGroups = pageGroups;
    // });

    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.pageLinks = playBook.pageLinks;
      if (this.pageLinks !== undefined) {
        if (this.pageLinks.length > 0 && this.showSideBar === true)
          this.showPrevNextBtn = true;
      }
    });

  }

  ngOnInit() {
    // const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ThemeSkyBlueComponent);
    // this.componentRef = this.container.createComponent(factory);
    // this.componentRef.instance.childViewContainer = this.pageContainer;

    // // this.componentRef.instance.type = type;

    // // this.componentRef.instance.output.subscribe(event => console.log(event));
  }

  ngOnDestroy() {
    // this.componentRef.destroy();
  }

  updateCurrentPage(pageId: string) {
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
    this.editorService.editor.subscribe((editor: Editor) => {
      this.editor = editor;
    });
    const currentPageId = this.editor.currentPageId;
    let pageId = null;
    if (isNext) {
      pageId = pages[(pages.indexOf(currentPageId) + 1) % totalPages];
    } else {
      pageId = pages[(pages.indexOf(currentPageId) - 1 + totalPages) % totalPages];
    }
    this.updateCurrentPage(pageId);
  }
}
