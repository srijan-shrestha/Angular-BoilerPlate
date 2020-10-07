import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
// import { NavAccordionHeaderComponent } from '../nav-accordion-header/nav-accordion-header.component';
// import { NavAccordionComponent } from '../nav-accordion/nav-accordion.component';
// import { NavAccordionItemComponent } from '../nav-accordion-item/nav-accordion-item.component';

@Component({
  selector: 'app-nav-accordion-dropdown',
  templateUrl: './nav-accordion-dropdown.component.html',
  styleUrls: ['./nav-accordion-dropdown.component.scss']
})
export class NavAccordionDropdownComponent implements AfterContentInit {
  // @ContentChildren(NavAccordionHeaderComponent) header: QueryList<NavAccordionHeaderComponent>;
  // @ContentChildren(NavAccordionDropdownComponent) dropdown: QueryList<NavAccordionDropdownComponent>;
  // @ContentChildren(NavAccordionItemComponent) items: QueryList<NavAccordionItemComponent>;
  // @ContentChildren(NavAccordionComponent) items: QueryList<NavAccordionComponent>;
  @Input() show = false;

  constructor() { }

  ngAfterContentInit() {
    // console.log(this.header);
    // console.log(this.dropdown);
    // if (this.header.length) {
    //   console.log("LENGTH");
    //   this.header.first.clicked.subscribe(val => {
    //     console.log('alksdjf;asdf');
    //   });
    // }
  }

}
