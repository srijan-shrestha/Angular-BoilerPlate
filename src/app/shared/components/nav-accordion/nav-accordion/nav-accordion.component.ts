import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { NavAccordionItemComponent } from '../nav-accordion-item/nav-accordion-item.component';

@Component({
  selector: 'app-nav-accordion',
  templateUrl: './nav-accordion.component.html',
  styleUrls: ['./nav-accordion.component.scss']
})
export class NavAccordionComponent implements OnInit, AfterContentInit {
  dynamicNavs: NavAccordionItemComponent[] = [];

  // @ContentChildren(NavAccordionDropdownComponent) navs: QueryList<NavAccordionDropdownComponent>;
  @ContentChildren(NavAccordionItemComponent) navItems: QueryList<NavAccordionItemComponent>;

  constructor() { }

  ngOnInit() {
  }

  // contentChildren are set
  ngAfterContentInit() {
    // // get all active tabs
    const activeNavs = this.navItems.filter(nav => nav.active);

    this.navItems.forEach((navItem: NavAccordionItemComponent) => {
      navItem.updateActive.subscribe(() => {
        this.navItems.forEach((navItem2: NavAccordionItemComponent) => {
          navItem2.active = false;
        });
        navItem.active = true;
      });
    });

    // // if there is no active tab set, activate the first
    // if (activeTabs.length === 0) {
    //   this.selectTab(this.tabs.first);
    // }

    // selectTab(nav: NavAccordionDropdownComponent, event = null) {
    //   if (event) event.preventDefault();
    //   // deactivate all tabs
    //   this.tabs.toArray().forEach(tab => (tab.active = false));
    //   this.dynamicNavs.forEach(tab => (tab.active = false));

    //   // activate the tab the user has clicked on.
    //   tab.active = true;
    // }

  }
}
