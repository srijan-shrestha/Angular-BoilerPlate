import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccordionHeaderComponent } from './nav-accordion-header.component';

describe('NavAccordionHeaderComponent', () => {
  let component: NavAccordionHeaderComponent;
  let fixture: ComponentFixture<NavAccordionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccordionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccordionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
