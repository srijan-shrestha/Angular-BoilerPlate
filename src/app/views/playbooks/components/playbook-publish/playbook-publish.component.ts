import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {PlayBook} from '../../../../shared/models/playbook.model';
import {PlayBookService} from '../../../../shared/services/playbook.service';
import {EditorService} from '../../../../shared/services/editor.service';
import {Editor} from '../../../../shared/models/editor.model';
import {Page} from '../../../../shared/models/playbook-page.model';
import {Theme} from '../../models/themes';
import {PageLink} from '../../../../shared/models/playbook-page-link.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatPickerComponent} from '../../../../shared/components/dat-picker/dat-picker.component';
import {TimePickerComponent} from '../../../../shared/components/time-picker/time-picker.component';
// @ts-ignore
import moment from 'moment';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-playbook-publish',
  templateUrl: './playbook-publish.component.html',
  styleUrls: ['./playbook-publish.component.scss'],
})
export class PlaybookPublishComponent implements OnInit {
  playBook: PlayBook;
  editor: Editor;
  page: Page;
  @Input() theme: Theme;
  pageLinks: PageLink[];
  @ViewChildren(DatPickerComponent) datePicker: DatPickerComponent;
  @ViewChildren(TimePickerComponent) timePicker: TimePickerComponent;

  publishForm = new FormGroup({
    publishDate: new FormControl('', [Validators.required]),
    publishTime: new FormControl('', [Validators.required])
  });

  constructor(private playBookService: PlayBookService,
              private editorService: EditorService,
              public ngModal: NgbModal,
              public activeModal: NgbActiveModal,
              private router: Router,
              private toasterService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.playBookService.playbook.subscribe((playBook: PlayBook) => {
      this.playBook = playBook;
      this.pageLinks = playBook.pageLinks;
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

  publish() {
    const momentInstance = moment;
    // @ts-ignore
    const dateObject = this.datePicker.first.model;
    // @ts-ignore
    const time = this.timePicker.first.time;
    if (!dateObject) {
      // @ts-ignore
      this.datePicker.first.open();
      return;
    }

    if (!time) {
      // @ts-ignore
      this.timePicker.first.open();
      return;
    }
    if (dateObject && time) {
      const dateTimePayload = `${dateObject.year}-${dateObject.month}-${dateObject.day} ${time}:00`;
      const validDate = new Date(dateTimePayload);
      const utcFormatDate = momentInstance.utc(validDate).format('YYYY-MM-DD HH:mm:ss');
      const dateArray = utcFormatDate.split(' ');
      this.playBook.publishedAt = dateArray[0] + 'T' + dateArray[1] + '.000Z';
      // @ts-ignore
      this.playBookService.publish(this.playBook.id, this.playBook).subscribe(() => {
        this.router.navigateByUrl(`/playbooks/${this.playBook.id}`).then();
        this.activeModal.close();
        this.toasterService.success('Playbook is set for publish.');
      });
    }
  }
}
