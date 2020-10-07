import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PdfPrintService} from '../../../../shared/services/pdf-print.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-preview-initiatives-bar',
  templateUrl: './preview-annual-initiatives-bar.component.html',
  styleUrls: ['./preview-annual-initiatives-bar.component.scss']
})

export class PreviewAnnualInitiativesBarComponent {
  @Input() titleText = 'You are previewing Annual Initiatives.What would you like to do next?';
  @Input() type: string;
  @Input() id: string;
  @Input() printSectionId: string;
  @Output() actionEvent = new EventEmitter();

  constructor(private pdfPrintService: PdfPrintService, private toastrService: ToastrService) {
  }

  exportToPdf(type: string, id: string) {
    this.pdfPrintService.getPdf(type, id).subscribe(pdf => {
      return pdf;
    }, error => {
      this.toastrService.error('Error generating pdf', 'Error');
    });
  }

  print(sectionId: string) {
    if (!sectionId) {
      this.toastrService.error('Missing element to print', 'Error');
      return;
    }
    this.pdfPrintService.printWindow(sectionId);
  }

  backBtnClick() {
    this.actionEvent.emit({action: 'cancel'});
  }
}
