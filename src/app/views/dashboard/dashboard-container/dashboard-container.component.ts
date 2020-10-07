import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  currentDate = new Date();
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
