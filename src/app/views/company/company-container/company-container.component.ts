import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-company-container',
  templateUrl: './company-container.component.html',
  styleUrls: ['./company-container.component.scss']
})
export class CompanyContainerComponent implements OnInit {
  public sidebarCollapsed: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sideBarState();
  }

  constructor() {
  }

  ngOnInit() {
    this.sideBarState();
  }

  sideBarState() {
    this.sidebarCollapsed = window.innerWidth > 1400;
  }
}
