import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../../../../shared/models/playbook-page.model';

@Component({
  selector: 'app-theme1-cover-two-column',
  templateUrl: './theme1-cover-two-column.component.html',
  styleUrls: ['./theme1-cover-two-column.component.scss']
})
export class Theme1CoverTwoColumnComponent implements OnInit {
  @Input() page: Page;

  constructor() {
  }

  ngOnInit() {
  }
}
