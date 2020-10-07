import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {PlayBookService} from 'src/app/shared/services/playbook.service';
import {PageGroupService} from 'src/app/shared/services/page-group.service';
import {PageGroup} from 'src/app/shared/models/playbook-page-group.model';
import {PlayBook} from 'src/app/shared/models/playbook.model';
import {EditorService} from 'src/app/shared/services/editor.service';
import {Editor} from 'src/app/shared/models/editor.model';
import {Page} from 'src/app/shared/models/playbook-page.model';
import {ActivatedRoute} from '@angular/router';
import {PlaybookPreviewComponent} from '../playbook-preview/playbook-preview.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import htmlToImage from 'html-to-image';
import {PlaybookCreateService} from '../../services/playbook-create.service';
import {PlaybookPublishComponent} from '../playbook-publish/playbook-publish.component';
import {PlaybookActiveFormService} from '../../services/playbook-active-form.service';
import {PlayBookHistoryService} from '../../../../shared/services/playbook-history.service';

@Component({
  selector: 'app-playbook-app',
  templateUrl: './playbook-app.component.html',
  styleUrls: ['./playbook-app.component.scss']
})
export class PlaybookAppComponent implements OnInit, OnDestroy {
  sidebarCollapsed = false;

  bottombarState: 'expanded' | 'normal' | 'hidden' = 'normal';

  pageGroups: PageGroup[];

  playBook: PlayBook;

  editor: Editor;

  page: Page;

  showGallery = false;
  playbookId: string;

  historyStatus: any = {enableUndo: false, enableRedo: false};
  historyDataSet = false;
  loading = false;

  constructor(
    private pageGroupService: PageGroupService,
    private playBookService: PlayBookService,
    private editorService: EditorService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private playbookCreateService: PlaybookCreateService,
    private playbookActiveFormService: PlaybookActiveFormService,
    private playBookHistoryService: PlayBookHistoryService
  ) {
    this.pageGroupService.pageGroups.subscribe((pageGroups: PageGroup[]) => {
      this.pageGroups = pageGroups;
    });
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.updateCurrentPage();
    });
    this.editorService.editor.subscribe((editor: Editor) => {
      this.editor = editor;
      this.updateCurrentPage();
    });
    this.playBookHistoryService.statuses.subscribe((history: any) => {
      this.historyStatus = history;
      this.updateCurrentPage();
    });

    this.playbookId = this.route.snapshot.paramMap.get('playbookId');
  }

  ngOnDestroy() {
    this.playBookService.resetPlaybookData();
    this.editorService.resetEditorData();
  }

  ngOnInit() {
    // if (this.playBook !== undefined) {
    //   if (this.playBook.title !== undefined) {
    //     if (!this.playBook.title) {
    //       this.showGallery = true;
    //     }
    //   }
    // }
    this.pageGroupService.getPageGroups().subscribe((res) => {
      // TODO: Should we get these when the website loads?
      this.pageGroupService.setPageGroupData(res);

      this.loadPlaybookData();
    });

    // this.pageGroupService.setPageGroupData([
    //   {
    //     id: 1,
    //     title: 'Cover Page',
    //     code: 'cover-page',
    //     layouts: [
    //       {
    //         id: 1,
    //         title: 'One Column',
    //         image: '',
    //         code: 'cover-one-column'
    //       },
    //       {
    //         id: 2,
    //         title: 'Two Column',
    //         image: '',
    //         code: 'cover-two-column'
    //       }
    //     ],
    //   }
    // ]);

    // TODO: fetch pages data and set to playbooks service here
    // this.playBookService.setPlaybookData({
    //   // completedPercentage: 0,
    //   // coverImage: '',
    //   id: '1',
    //   publishedAt: null,
    //   createdAt: new Date(),
    //   pageLinks: [],
    //   pages: {},
    //   quarter: 1,
    //   theme: {
    //     description: '',
    //     id: 1,
    //     image: '',
    //     pages: [],
    //     title: 'Sky blue (static)',
    //     code: 'sky-blue'
    //   },
    //   title: 'Playbook Title',
    //   year: 2019
    // });
  }

  loadPlaybookData() {
    this.playBookService.getPlaybook(this.playbookId).subscribe((res: any) => {
        if (!Object.entries(res.pageLinks).length && !res.title) {
          this.showGallery = true;
        }
        this.playBookService.setPlaybookData(res);
        this.updateHistoryData();
        if (!res.title) {
          this.showGallery = true;
        }
      },
      err => {
        console.log(err);
      });
  }

  updateCurrentPage() {
    if (this.editor) {
      this.page = this.editorService.getCurrentPage();
    }
  }

  toggled(e: boolean) {
    this.sidebarCollapsed = e;
  }

  bottombarStateUpdated(state: 'expanded' | 'normal' | 'hidden') {
    this.bottombarState = state;
  }

  openPreviewModal() {
    const modalRef = this.modalService.open(PlaybookPreviewComponent,
      {
        size: 'xl',
        centered: true,
        windowClass: 'playbookpreview-model-size',
        backdrop: true,
        backdropClass: 'dark-backdrop'
      });
    modalRef.componentInstance.showSideBar = false;
  }

  openPublishModal() {
    const modalRef = this.modalService.open(PlaybookPublishComponent,
      {
        size: 'xl',
        centered: true,
        windowClass: 'playbookpreview-model-size',
        backdrop: true,
        backdropClass: 'dark-backdrop'
      });
    modalRef.componentInstance.showSideBar = false;
  }

  dataUrlToFile(dataUrl, filename) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  savePlaybook() {
    let imageUploading = false;
    if (Object.keys(this.playBook.pages).length > 0) {
      const that = this;
      if (this.page && this.page.title === 'Cover') {
        imageUploading = true;
        that.loading = true;
        // TODO: htmlToImage takes too much time. We need a way to reduce the processing time.
        htmlToImage.toJpeg(document.body.querySelector('.coverPager .playbook__page-inner'), {
          cacheBust: true
        }).then((dataUrl) => {
          const image = that.dataUrlToFile(dataUrl, 'cover.png');
          const uploadData = new FormData();
          uploadData.append('image', image);
          uploadData.append('playbook_id', that.playBook.id);
          that.playbookCreateService.postPlaybookCoverImage(uploadData).subscribe((resp) => {
            imageUploading = true;
            that.loading = false;
            this.toastrService.success('Playbook data saved successfully.', 'Success!');
          });
        });
      }
    }
    this.playBookService.updatePlaybook(+this.playBook.id, this.playBook).subscribe(
      (resp) => {
        if (!imageUploading) {
          this.toastrService.success('Playbook data saved successfully.', 'Success!');
        }
      }, (err) => {
        this.toastrService.error('Unable to saved.', 'Error!');
      });
  }

  customizePlaybook(event ?: Event) {
    this.playbookActiveFormService.clear();
    this.playbookActiveFormService.setActiveFormCodeData('playbook-detail', {title: this.playBook.title});
    if (event) {
      event.stopPropagation();
    }
  }

  undoAction() {
    if (this.historyStatus.enableUndo) {
      const currentPlaybook = this.playBookHistoryService.undo();
      this.editorService.updatePlaybook(currentPlaybook);
    }
  }

  redoAction() {
    if (this.historyStatus.enableRedo) {
      const currentPlaybook = this.playBookHistoryService.redo();
      this.editorService.updatePlaybook(currentPlaybook);
    }
  }

  updateHistoryData() {
    this.playBookHistoryService.setPlaybookData(this.playBook);
  }

  showYear(): string {
    return this.playBook.year ? this.playBook.year.toString().substr(2, 2) : '';
  }

}
