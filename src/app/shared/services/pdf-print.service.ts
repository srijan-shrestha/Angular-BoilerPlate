import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxPrinterService} from 'ngx-printer';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PdfPrintService {

  constructor(private http: HttpClient, private printService: NgxPrinterService, private toastrService: ToastrService) {
    this.printService.printOpenWindow = false;
    this.printService.renderClass = 'printer-default';
  }

  getPdf(type: string, id: string) {
    return this.http.get(`/pdf-report/${type}/${id}`);
  }

  getPdfFromData(type: string, data) {
    return this.http.post(`/pdf-report-from-data/${type}/`, data);
  }
  printWindow(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) {
      this.toastrService.error('Cannot get the element to print', 'Missing element');
      return;
    }
    this.printService.printHTMLElement(element);
  }
}
