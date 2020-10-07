import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dat-picker',
  templateUrl: './dat-picker.component.html',
  styleUrls: ['./dat-picker.component.scss']
})
export class DatPickerComponent implements OnInit {
  model: NgbDateStruct;
  // todo Take this from prop and make it optional.
  minDate: any = {};

  constructor() {
  }

  ngOnInit() {
    const today = new Date();
    this.minDate = {year: today.getFullYear(), month: today.getMonth(), day: today.getDate()};
  }

  open = () => document.getElementById('date-button').click();
}
