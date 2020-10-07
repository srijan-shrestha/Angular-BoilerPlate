import { TestBed } from '@angular/core/testing';

import { PdfPrintService } from './pdf-print.service';

describe('PdfPrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfPrintService = TestBed.get(PdfPrintService);
    expect(service).toBeTruthy();
  });
});
