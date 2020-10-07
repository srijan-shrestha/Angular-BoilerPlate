import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {PlaybookPreviewComponent} from '../playbook-preview/playbook-preview.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlayBookService} from '../../../../shared/services/playbook.service';
import {PageGroupService} from '../../../../shared/services/page-group.service';
// @ts-ignore
import moment from 'moment';


@Component({
  selector: 'app-playbook-accordion',
  templateUrl: './playbook-accordion.component.html',
  styleUrls: ['./playbook-accordion.component.scss']
})
export class PlaybookAccordionComponent implements OnInit {
  @Input() playBooksdata: any;
  @Input() isAdmin: any;
  @Output() playbookDetail = new EventEmitter<any>();
  @Input() isEditorPage: boolean;

  selectedIndex: number;
  userIsAdmin: boolean;

  constructor(private router: Router, private modalService: NgbModal,
              private pageGroupService: PageGroupService,
              private playBookService: PlayBookService,
              public authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  showPreviewOrDetailBasedOnRole(data, quarter, year, rowCount) {
    if (this.isEditorPage && this.isAdmin) {
      this.playBookDetail(data, quarter, year, rowCount);
    } else {
      this.openPreviewModal(data);
    }
  }

  playBookDetail(data, quarter, year, rowCount) {
    if (data) {
      this.selectedIndex = (rowCount * 4) + quarter;
      this.playbookDetail.emit(data);
    } else {
      this.router.navigateByUrl('/playbooks/themes', {state: {data: {quarter, year}}});
    }
  }

  openPreviewModal(data) {
    if (data) {
      this.pageGroupService.getPageGroups().subscribe((res) => {
        this.pageGroupService.setPageGroupData(res);
        this.loadPlaybookData(data);
      });
    }
  }

  loadPlaybookData(data) {
    this.playBookService.getPlaybook(data.id).subscribe((res: any) => {
        this.playBookService.setPlaybookData(res);
        const modalRef = this.modalService.open(PlaybookPreviewComponent,
          {
            size: 'xl',
            centered: true,
            windowClass: 'playbookpreview-model-size',
            backdrop: 'static',
            backdropClass: 'dark-backdrop'
          });
        modalRef.componentInstance.showSideBar = true;
      },
      err => {
        console.log(err);
      });
  }

  shouldShow = (data: any, indexKey): boolean => {
    const momentInstance = moment;
    if (this.isEditorPage) {
      this.authService.isAdmin().subscribe(isAdmin => this.userIsAdmin = isAdmin);
      return data.q1 === undefined || this.userIsAdmin || data['q' + indexKey];
    } else {
      return data.q1 !== undefined && data['q' + indexKey] && data['q' + indexKey].publishedAt
        && momentInstance(data['q' + indexKey].publishedAt).isSameOrBefore(momentInstance(new Date()));
    }
  }
}
