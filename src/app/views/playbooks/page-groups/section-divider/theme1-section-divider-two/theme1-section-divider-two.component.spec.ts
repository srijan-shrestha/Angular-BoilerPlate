import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1SectionDividerTwoComponent } from './theme1-section-divider-two.component';

describe('Theme1SectionDividerTwoComponent', () => {
  let component: Theme1SectionDividerTwoComponent;
  let fixture: ComponentFixture<Theme1SectionDividerTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1SectionDividerTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1SectionDividerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
