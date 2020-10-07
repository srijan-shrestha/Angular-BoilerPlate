import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccordionComponent } from './nav-accordion.component';

describe('NavAccordionComponent', () => {
  let component: NavAccordionComponent;
  let fixture: ComponentFixture<NavAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
