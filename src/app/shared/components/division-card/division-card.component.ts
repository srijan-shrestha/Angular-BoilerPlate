import { Component, OnInit, Input } from '@angular/core';
import { Division } from '../../models/division.model';

@Component({
  selector: 'app-division-card',
  templateUrl: './division-card.component.html',
  styleUrls: ['./division-card.component.scss']
})
export class DivisionCardComponent implements OnInit {
  @Input() division: Division;
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
