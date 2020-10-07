import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-nav-item',
  templateUrl: './top-nav-item.component.html',
  styleUrls: ['./top-nav-item.component.scss']
})
export class TopNavItemComponent implements OnInit {
  @Input() link;
  constructor() { }

  ngOnInit() {
  }

}
