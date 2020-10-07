import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyPlanPreviewComponent } from './quarterly-plan-preview.component';

describe('QuarterlyPlanPreviewComponent', () => {
  let component: QuarterlyPlanPreviewComponent;
  let fixture: ComponentFixture<QuarterlyPlanPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterlyPlanPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyPlanPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
