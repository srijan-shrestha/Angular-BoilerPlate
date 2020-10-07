import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccordionItemComponent } from './nav-accordion-item.component';

describe('NavAccordionItemComponent', () => {
  let component: NavAccordionItemComponent;
  let fixture: ComponentFixture<NavAccordionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccordionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
