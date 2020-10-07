import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-approve-dialog',
  templateUrl: './confirmation-approve-dialog.component.html',
  styleUrls: ['./confirmation-approve-dialog.component.scss']
})
export class ConfirmationApproveDialogComponent implements OnInit {
  @Input() title;
  @Input() body;
  @Input() acceptText: string;
  @Input() declineText: string;
  @Input() type: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
