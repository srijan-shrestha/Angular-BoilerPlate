import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccordionDropdownComponent } from './nav-accordion-dropdown.component';

describe('NavAccordionDropdownComponent', () => {
  let component: NavAccordionDropdownComponent;
  let fixture: ComponentFixture<NavAccordionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccordionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccordionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
