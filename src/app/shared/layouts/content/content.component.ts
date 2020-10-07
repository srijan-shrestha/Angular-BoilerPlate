import {Component, OnInit, Input, HostListener} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() sidebar: 'lg' | 'md' | 'sm'; // sidebar width
  @Input() sidebarCollapsed = false; // sidebar collapsed state.
  public sidebarState: any;

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
    this.sidebarState = window.innerWidth > 1400;
  }

}
