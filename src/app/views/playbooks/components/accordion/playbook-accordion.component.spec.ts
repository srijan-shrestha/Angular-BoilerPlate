import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookAccordionComponent } from './playbook-accordion.component';

describe('AccordionComponent', () => {
  let component: PlaybookAccordionComponent;
  let fixture: ComponentFixture<PlaybookAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
