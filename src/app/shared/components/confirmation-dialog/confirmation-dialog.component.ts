import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title;
  @Input() body: string;
  @Input() acceptText: string;
  @Input() declineText: string;
  @Input() type: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
}
