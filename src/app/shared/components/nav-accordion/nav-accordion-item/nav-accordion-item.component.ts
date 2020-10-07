import { Component, OnInit, Input, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter} from '@angular/core';
import { NavAccordionHeaderComponent } from '../nav-accordion-header/nav-accordion-header.component';
import { NavAccordionDropdownComponent } from '../nav-accordion-dropdown/nav-accordion-dropdown.component';
import { NavResetService } from '../nav-reset.service';

@Component({
  selector: 'app-nav-accordion-item',
  templateUrl: './nav-accordion-item.component.html',
  styleUrls: ['./nav-accordion-item.component.scss']
})
export class NavAccordionItemComponent implements AfterContentInit {
  private privateActive = false;

  get active(): boolean {
    return this.privateActive;
  }

  @Input()
  set active(v: boolean) {
    this.privateActive = v;
    // console.log(this.dropdown.first.show);

    if (this.header.length) {
      this.header.first.active = this.privateActive;
    }
    if (this.dropdown.length) {
      this.dropdown.first.show = this.privateActive;
      // this.dropdown.first.items.toArray().forEach(item => {
      //   item.active = false;
      // });
    }
  }

  @Output() updateActive = new EventEmitter<NavAccordionItemComponent>();

  @ContentChildren(NavAccordionHeaderComponent) header: QueryList<NavAccordionHeaderComponent>;
  @ContentChildren(NavAccordionDropdownComponent) dropdown: QueryList<NavAccordionDropdownComponent>;

  constructor() {

  }

  ngAfterContentInit() {
    if (this.header.length) {
      this.header.first.clicked.subscribe(headerType => {
        // Toggle the dropdown item.
        this.active = true;
        // if (this.dropdown.length) {

        // }
        // this.dropdown.first
        // if (this.dropdown.length) {
        //   this.dropdown.first.
        // }

        if (this.active) {
          this.updateActive.emit(this);
        }

        if (headerType === 'pageLink') {

        }
      });
    }
  }

}
