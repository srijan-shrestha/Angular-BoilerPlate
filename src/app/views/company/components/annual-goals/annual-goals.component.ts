import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { PdfPrintService } from 'src/app//shared/services/pdf-print.service';
import { ToastrService } from 'ngx-toastr';
import { InitiativeService } from '../../../planning-and-execution/services/initiative.service';
import {
  ConfirmationDeleteDialogComponent
} from 'src/app/shared/components/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-annual-goals',
  templateUrl: './annual-goals.component.html',
  styleUrls: ['./annual-goals.component.scss']
})
export class AnnualGoalsComponent implements OnInit, OnDestroy {
  routerSubscription;
  year = null;
  type = 'publish';
  action = 'publish';
  navNeeded = false;
  status = 2;
  inputData = {action: this.type, year: null, status: this.status, initiativeData: []};
  role = null;
  selectedId = null;
  show = false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private pdfPrintService: PdfPrintService,
    private toastrService: ToastrService,
    private initiativeService: InitiativeService,
    private modalService: NgbModal,
    private  router: Router
  ) {
    this.routerSubscription = router.events
      .subscribe((event: NavigationStart) => {
        let routeArray = this.router.url.split('/');
        if (routeArray[4] !== this.type) {
          this.type = routeArray[4];
        }
        if (event.navigationTrigger === 'popstate') {
          routeArray = event.url.split('/');
          if (routeArray.includes('annual-goals')) {
            this.action = routeArray[4];
            this.type = routeArray[4];
            if (['create', 'draft', 'edit', 'preview', 'marking'].includes(routeArray[4])) {
              if (routeArray[4] === 'marking') {
                this.action = 'create';
                this.type = 'create';
              }
              this.status = 1;
            } else if (['publish'].includes(routeArray[4])) {
              this.status = 2;
            }
            this.inputData = {action: this.type, year: null, status: this.status, initiativeData: []};
            this.checkForAccessibility();
          }
        }
      });

  }
  ngOnInit() {
    const routeArray = this.router.url.split('/');
    this.role = routeArray[3];
    this.action = this.type = routeArray[4];
    if (['create', 'edit', 'draft', 'preview', 'marking'].includes(routeArray[4])) {
      if (routeArray[4] === 'marking' || routeArray[4] === 'edit') {
        this.action = 'create';
        this.type = 'create';
      }
      this.status = 1;
    } else if (['publish'].includes(routeArray[4])) {
      this.status = 2;
    }
    this.checkForAccessibility();
    this.inputData = {action: this.action, year: null, status: this.status, initiativeData: []};
  }


  isCreateSelected = (): boolean => ['create', 'draft', 'edit', 'preview'].includes(this.type);

  isPublishSelected = (): boolean => ['publish'].includes( this.type);

  isDraftOrPublishedSelected = (): boolean => ['publish', 'draft', 'preview'].includes(this.type);

  navigated = (type) => {
    this.type = type;
    this.status = 1;
    if (this.type === 'publish') {
      this.status = 2;
    }
    this.inputData = {action: type, year: null, status: this.status, initiativeData: []};
    this.checkForAccessibility();
  }

  actionEvent(data) {
    this.wizardClosed();
    if (data.id) {
      this.selectedId = data.id;
    } else if (this.selectedId) {
      data.id = this.selectedId;
    }
    if (data.action === 'draft') {
      data.status = 1;
      this.saveAnnualInitiative(data);
    } else if (data.action === 'publish') {
      if (!this.isVisualMarkingRequired(data)) {
        data.status = 2;
        this.getPublishConfirmationAndSaveData(data);
      }
    } else if (data.action === 'preview') {
      if (!this.isVisualMarkingRequired(data)) {
        data.action = 'preview';
        this.type = 'preview';
        data.status = 1;
        this.inputData = data;
      }
    } else if (data.action === 'edit') {
      this.type = 'edit';
      data.status = 1;
      this.inputData = data;
    } else if (data.action === 'cancel') {
      this.inputData = data;
      this.type = 'edit';
    }
    this.checkForAccessibility();
  }

  exportToPdf = () => {
    if (!!this.selectedId === false || this.inputData.action === 'preview') {
      const data = {
        year: this.inputData.year,
        is_draft: this.inputData.status === 1,
        annual_initiative : this.inputData.initiativeData
      }
      this.pdfPrintService.getPdfFromData('ANNUAL_GOAL', data).subscribe(pdf => {
        this.downloadPDFile(pdf);
      }, error => {
        this.toastrService.error('Error generating pdf', 'Error');
      });
      return;
    }
    this.pdfPrintService.getPdf('ANNUAL_GOAL', this.selectedId).subscribe(pdf => {
      this.downloadPDFile(pdf);
    }, error => {
      this.toastrService.error('Error generating pdf', 'Error');
    });
  }

  downloadPDFile(pdf) {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + pdf;
    link.download = 'ANNUAL_GOALS.pdf';
    document.body.appendChild(link);
    link.click();
  }

  print = (sectionId: string) => {
    if (!sectionId) {
      this.toastrService.error('Missing element to print', 'Error');
      return;
    }
    this.pdfPrintService.printWindow(sectionId);
  }

  getPublishConfirmationAndSaveData(data): any {
    const modalRef = this.modalService.open(ConfirmationDeleteDialogComponent,
      {centered: true, windowClass: 'confirmation-modal-size'});
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.body = 'Do you want to publish? This action cannot be undone';
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.acceptText = 'Confirm';
    modalRef.componentInstance.declineText = 'Cancel';
    modalRef.result.then((result: 'accept' | 'decline') => {
      if (result === 'accept') {
        this.saveAnnualInitiative(data);
      }
    });
  }

  saveAnnualInitiative(data) {
    this.initiativeService.createAnnualInitiative(data).subscribe(response => {
      if (response) {
        let message = 'Annual Plans and Initiative has been published';
        if (data.status === 1) {
          data.status = 1;
          message = 'Draft has been saved';
        } else {
          this.type = 'publish';
          data.action = 'publish';
          data.status = 2;
        }
        this.updateUrl();
        this.inputData = data;
        this.toastrService.success(message, 'Success!');
      }
    }, error => {
      console.log(error);
    });
  }

  isVisualMarkingRequired(data) {
    let iconNull = false;
    const formData = data.initiativeData;
    formData.forEach((index) => {
      if (!!index.icon === false) {
        iconNull = true;
      }
    });
    if (iconNull) {
      this.inputData = data;
      this.type = 'marking';
      return true;
    }
    return false;
  }

  selectedIdEvent(id) {
    this.selectedId = id;
  }

  checkForAccessibility() {
    if (this.role === 'employee') {
      this.type = 'publish';
      this.navNeeded = false;
      this.status = 2;
    } else {
      this.navNeeded = true;
      if (['create', 'draft', 'edit', 'preview'].includes(this.type)) {
          this.status = 1;
      } else if (['publish'].includes(this.type)) {
        this.status = 2;
      }
    }
    this.updateUrl();
  }

  updateUrl() {
    this.router.navigate([`company/annual-goals/${this.role}/${this.type}`]);
    this.wizardClosed();
  }

  toggle = () => this.show = !this.show;
  wizardClosed = () => this.show = false;

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
