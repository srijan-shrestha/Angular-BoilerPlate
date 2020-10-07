import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {PageLink} from 'src/app/shared/models/playbook-page-link.model';
import {PlayBookService} from 'src/app/shared/services/playbook.service';
import {PlayBook} from 'src/app/shared/models/playbook.model';
import {PageGroupService} from 'src/app/shared/services/page-group.service';
import {PageGroup} from 'src/app/shared/models/playbook-page-group.model';
import {Page} from 'src/app/shared/models/playbook-page.model';
import {EditorService} from 'src/app/shared/services/editor.service';
import {Editor} from 'src/app/shared/models/editor.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import {TemplatePortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {fromEvent, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {PlaybookCreateService} from '../../services/playbook-create.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-playbook-sidebar',
  templateUrl: './playbook-sidebar.component.html',
  styleUrls: ['./playbook-sidebar.component.scss']
})
export class PlaybookSidebarComponent implements OnInit {

  pageLinks: PageLink[];

  pageGroups: PageGroup[];

  pages: { [id: string]: Page };

  editor: Editor;

  viewType: 'page' | 'list' = 'page';
  loadDefaultPlayBookPage = true;

  @Input() sidebarCollapsed;

  @ViewChild('playbookContextMenu', {static: false}) playbookContextMenu: TemplateRef<any>;
  @ViewChild('pageModal', {static: false}) pageModal: TemplateRef<any>;

  initiative: {
    name: ['paid', 'Ontrack optimiztion', 'Ccom Brand Initiatives', 'Lexington Mobile app', 'Up Funnel Initiatives']
  };


  overlayRef: OverlayRef | null;

  sub: Subscription;

  playBook: PlayBook;


  constructor(private pageGroupService: PageGroupService,
              private playBookService: PlayBookService,
              private editorService: EditorService,
              private modalService: NgbModal,
              public viewContainerRef: ViewContainerRef,
              private overlay: Overlay,
              private toastrService: ToastrService,
              private playbbookCreateService: PlaybookCreateService) {
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.pageLinks = playBook.pageLinks;
      this.pages = playBook.pages;
      this.playBook = playBook;
      if (this.pageLinks !== undefined && this.loadDefaultPlayBookPage === true) {
        if (this.pageLinks.length > 0) {
          this.loadDefaultPlayBookPage = false;
          this.updateCurrentPage(undefined, this.pageLinks[0].pages[0]);
        }
      }
    });
  }

  ngOnInit() {
    // this.playBookService.playbook.subscribe((playBook: PlayBook) => {
    //   this.pageLinks = playBook.pageLinks;
    //   this.pages = playBook.pages;
    //   this.playBook = playBook;
    // });
    this.pageGroupService.pageGroups.subscribe((pageGroups: PageGroup[]) => {
      this.pageGroups = pageGroups;
    });
    this.editorService.editor.subscribe((editor: Editor) => {
      this.editor = editor;
    });
  }

pageViewActive() {
  this.viewType = 'page';
  const parentClass = document.getElementById('pills-tab-wrapper').children;
  for (let i = 0; i < 2; i++) {
    parentClass[i].classList.remove('active')
  }
  document.getElementById('page-view').classList.add('active');
}

listViewActive() {
  this.viewType = 'list';
  const parentClass = document.getElementById('pills-tab-wrapper').children;
  for (let i = 0; i < 2; i++) {
    parentClass[i].classList.remove('active')
  }
  document.getElementById('list-view').classList.add('active');
}

  createNewPage(pageGroup: PageGroup) {
    let coverPage = false;
    if (Object.keys(this.playBook.pages).length > 0) {
      coverPage = Object.keys(this.playBook.pages).map(first => {
        return this.playBook.pages[first].title === pageGroup.title && pageGroup.title === 'Cover'

      }).reduce((a, b) => {
        return a || b;
      });
    }
    if (coverPage) {
      this.toastrService.error('Cover page cannot be duplicate.', 'Error!');
      // this.modalService.dismissAll('page_selected');
    } else {
      // console.log(this.pageGroups[0], this.pageGroups[0].layouts[0]);
      // this.playBookService.createPage(this.pageGroups[0], this.pageGroups[0].layouts[0]);
      if (pageGroup.code === 'company_wide_initiatives') {
        // this.playbbookCreateService.getCompanyWideInitiatives().subscribe((res: Array<any>) => {
        //   const data = {
        //     initiatives: {
        //       texts: res.map(initiative => initiative.name )
        //     }
        //   };
        //   this.playBookService.createPage(pageGroup, pageGroup.layouts[0], data);
        // });
        const data = {
          initiatives: {
            texts: ['Paid Sales', 'Ontrack Optimization', 'Ccom Brand Initiatives', 'Lexington Mobile App', 'Up Funnel Initiatives'],
          },
          quarterInitiatives: {
            textInfo: [
              {
                text1: 'Ligula Elit Etiam diocum',
                text2: 'que et velestist que non nonseque nim nis inis aut qui corem volesti',
              },

              {
                text1: 'Ligula Elit Etiam diocum',
                text2: 'que et velestist que non nonseque nim nis inis aut qui corem volesti',
              },

              {
                text1: 'Ligula Elit Etiam diocum',
                text2: 'que et velestist que non nonseque nim nis inis aut qui corem volesti',
              },

              {
                text1: 'Ligula Elit Etiam diocum',
                text2: 'que et velestist que non nonseque nim nis inis aut qui corem volesti',
              },
            ]
          }
        };


        this.playBookService.createPage(pageGroup, pageGroup.layouts[0], data);
      } else if (pageGroup.code === 'toc') {
        const data = {
          tocLeft: {
            toc1Title: 'Something before beginning',
            toc2Title: 'Passion - key to salvation',
            toc3Title: 'Regularity means nothing at all',
            toc4Title: 'Spoke from your heart',
            toc5Title: 'Answer to all question in the world',
            toc1Page: '02',
            toc2Page: '04',
            toc3Page: '08',
            toc4Page: '13',
            toc5Page: '15',
          },
          tocRight: {
            toc1Title: 'Something before beginning',
            toc2Title: 'Passion - key to salvation',
            toc3Title: 'Regularity means nothing at all',
            toc4Title: 'Spoke from your heart',
            toc5Title: 'Answer to all question in the world',
            toc1Page: '02',
            toc2Page: '04',
            toc3Page: '08',
            toc4Page: '13',
            toc5Page: '15',
          }
        };
        this.playBookService.createPage(pageGroup, pageGroup.layouts[0], data);
      } else if (pageGroup.code === 'upcoming_events') {
        const data = {
          birthdayEvent: {
            textInfo: [
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
            ]
          },
          anniversaryEvent: {
            textInfo: [
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
            ]
          },
          promotionEvent: {
            textInfo: [
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
              {
                text1: 'John Doe',
                text2: 'July 8'
              },
            ]
          }
        };
        this.playBookService.createPage(pageGroup, pageGroup.layouts[0], data);
      } else {
        this.playBookService.createPage(pageGroup, pageGroup.layouts[0]);
      }
      this.modalService.dismissAll('page_selected');
    }

  }

  createNewPage2() {
    this.playBookService.createPage(this.pageGroups[0], this.pageGroups[0].layouts[1]);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pageLinks, event.previousIndex, event.currentIndex);
  }

  linkPrevious(linkIdx, pageIdx) {
    this.closeContextMenu();
    const prevLinkIdx = linkIdx - 1;

    if (prevLinkIdx < 0) {
      return false;
    }

    const pages = this.pageLinks[linkIdx].pages;

    this.pageLinks[prevLinkIdx].pages = this.pageLinks[prevLinkIdx].pages.concat(pages);

    this.pageLinks.splice(linkIdx, 1);
  }

  linkNext(linkIdx, pageIdx) {
    this.closeContextMenu();
    const nextLinkIdx = linkIdx + 1;

    if (nextLinkIdx > this.pageLinks.length) {
      return false;
    }

    const pages = this.pageLinks[linkIdx].pages;

    this.pageLinks[nextLinkIdx].pages = pages.concat(this.pageLinks[nextLinkIdx].pages);

    this.pageLinks.splice(linkIdx, 1);
  }

  unlink(linkIdx, pageIdx) {
    this.closeContextMenu();

    const link = this.pageLinks[linkIdx];

    if (link.pages.length === 0) {
      return false;
    }

    const page = this.pageLinks[linkIdx].pages.splice(pageIdx, 1)[0];

    // Remove the link object if no pages exists within it.
    if (this.pageLinks[linkIdx].pages.length === 0) {
      this.pageLinks.splice(linkIdx, 1);
    }

    if (pageIdx === 0) {
      this.pageLinks.splice(linkIdx, 0, {
        pages: [page]
      });
    } else {
      this.pageLinks.splice(linkIdx + 1, 0, {
        pages: [page]
      });
    }
  }

  deletePage(linkIdx, pageIdx) {
    // Delete confirmation; Delete if accepted.
    const modalRef = this.modalService.open(ConfirmationDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'}
    );
    if (this.pageLinks[linkIdx].pages.length > 1) {
      modalRef.componentInstance.body = 'Are you sure you want to delete all linked pages?';
    } else {
      modalRef.componentInstance.body = 'Are you sure you want to delete this page?';
    }
    modalRef.componentInstance.title = 'You are about to delete';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Delete';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.pageLinks[linkIdx].pages.forEach(page => {
          delete this.pages[page];
        });
        this.pageLinks.splice(linkIdx, 1);
        // this.pageLinks[linkIdx].pages.splice(pageIdx, 1);
        // if (this.pageLinks[linkIdx].pages.length === 0) {
        //   this.pageLinks.splice(linkIdx, 1);
        // }
      }
    }, (reason) => {
      console.log('dismissed');
    });
  }

  updateCurrentPage(pageLink: PageLink, pageId: string) {
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

  openContextMenu({x, y}: MouseEvent, pages, linkIdx, pageIdx, link, linksCount) {
    this.closeContextMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({x, y})
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'dropdown-menu'
    });

    this.overlayRef.attach(new TemplatePortal(this.playbookContextMenu, this.viewContainerRef, {
      $implicit: pages,
      linkIdx,
      pageIdx,
      link,
      linksCount
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeContextMenu());
  }

  closeContextMenu() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  createPageModal() {
    this.modalService.open(this.pageModal, {centered: true, size: 'xl'}).result
      .then((a) => {
      }, (b) => {
      });
  }

  getPageGroupImage(pageGroup: PageGroup) {
    const page = (this.playBook.theme.pages.find(p => pageGroup.id === p.pageGroup && p.isPagePreview === false));
    if (page && page.image) {
      return `url(${page.image})`;
    }
    return '';
  }

  // updateNextPrev(isNext) { // isNext = true => next page  ; false => previousPage
  //
  //   // console.log(this.editor.currentPageId);
  //   //calculate page number
  //
  //   // let totalPages =
  //
  //   // let pageNumber = 0;
  //   // for (const link of this.pageLinks) {
  //   //   const idx = link.pages.indexOf(pageId);
  //   //   if (idx !== -1) {
  //   //     pageNumber += idx;
  //   //     break;
  //   //   } else {
  //   //     pageNumber += link.pages.length;
  //   //   }
  //   // }
  //
  //   // console.log(this.editor.currentPageNumber);
  //   const pages = this.playBookService.getPagesArray();
  //   const totalPages = pages.length;
  //   const currentPageId = this.editor.currentPageId;
  //   let pageId = null;
  //   if (isNext) {
  //     pageId = pages[pages.indexOf(currentPageId) + 1];
  //   } else {
  //     pageId = pages[pages.indexOf(currentPageId) - 1];
  //   }
  //   this.updateCurrentPage(undefined, pageId);
  // }
}
