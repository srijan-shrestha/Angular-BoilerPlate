import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() showToggle = true;

  private privateCollapsed = false;
  sideIcon;

  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showHideSidebar();
  }

  get collapsed() {
    return this.privateCollapsed;
  }

  @Input()
  set collapsed(v) {
    this.privateCollapsed = v;
    // this.toggl

  }

  constructor() { }

  ngOnInit() {
    this.showHideSidebar();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.toggled.emit(this.collapsed);
    this.sideIcon = !this.sideIcon;
  }

  showHideSidebar() {
    if (window.innerWidth >= 1400) {
      this.collapsed = false;
      this.toggled.emit(false);
      this.sideIcon = !this.sideIcon;
    }
    if (window.innerWidth <= 1400) {
      this.collapsed = true;
      this.toggled.emit(true);
      this.sideIcon = !this.sideIcon;
    }
  }
}
