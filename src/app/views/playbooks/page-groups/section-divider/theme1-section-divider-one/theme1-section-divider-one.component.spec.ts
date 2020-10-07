import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1SectionDividerOneComponent } from './theme1-section-divider-one.component';

describe('Theme1SectionDividerOneComponent', () => {
  let component: Theme1SectionDividerOneComponent;
  let fixture: ComponentFixture<Theme1SectionDividerOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1SectionDividerOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1SectionDividerOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
