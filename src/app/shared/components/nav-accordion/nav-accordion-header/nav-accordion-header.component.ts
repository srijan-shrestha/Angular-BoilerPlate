import { Component, OnInit, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { NavAccordionDropdownComponent } from '../nav-accordion-dropdown/nav-accordion-dropdown.component';
import { NavResetService } from '../nav-reset.service';

@Component({
  selector: 'app-nav-accordion-header',
  templateUrl: './nav-accordion-header.component.html',
  styleUrls: ['./nav-accordion-header.component.scss']
})
export class NavAccordionHeaderComponent implements OnInit {
  @Input() type: 'dropdown' | 'routerLink' | 'pageLink' = 'pageLink';

  private privateActive = false;
  @Input() parentShow = true;

  get active(): boolean {
    return this.privateActive;
  }

  @Input()
  set active(v: boolean) {
    this.privateActive = v;
  }

  @Output() clicked = new EventEmitter<string>();


  constructor(private navResetService: NavResetService) { }

  ngOnInit() {
    this.navResetService.data.subscribe(reset => {
      if (reset) {
        this.active = false;
      }
    });
  }

  onClick() {
    // console.log(this.dropdown);
    this.navResetService.setData(true);
    this.navResetService.setData(false);
    this.clicked.emit(this.type);


    // this.active = !this.active;

    // switch (this.type) {
    //   case 'dropdown': {
    //     this.clicked.emit('dropdown');
    //     break;
    //   }
    //   case 'page-link': {
    //     this.clicked.emit('dropdown');
    //     break;
    //   }
    //   case 'page-link': {
    //     break;
    //   }
    // }
  }
}
