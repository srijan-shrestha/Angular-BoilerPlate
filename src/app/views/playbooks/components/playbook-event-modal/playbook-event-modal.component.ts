import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-playbook-event-modal',
  templateUrl: './playbook-event-modal.component.html',
  styleUrls: ['./playbook-event-modal.component.scss']
})
export class PlaybookEventModalComponent implements OnInit {
  @Input() title;
  @Input() body;
  @Input() linkButtonText;
  @Input() primaryButtonText;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
