import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cultural-photo-event-dialog',
  templateUrl: './cultural-photo-event-dialog.component.html',
  styleUrls: ['./cultural-photo-event-dialog.component.scss']
})
export class CulturalPhotoEventDialogComponent implements OnInit {

  @Input() title;
  @Input() body;

  constructor(public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
  }

}
