import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-delete-dialog',
  templateUrl: './confirmation-delete-dialog.component.html',
  styleUrls: ['./confirmation-delete-dialog.component.scss']
})
export class ConfirmationDeleteDialogComponent implements OnInit {
  @Input() title;
  @Input() body;
  @Input() acceptText: string;
  @Input() declineText: string;
  @Input() type: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
