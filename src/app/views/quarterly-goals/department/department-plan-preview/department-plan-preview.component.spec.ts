import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPlanPreviewComponent } from './department-plan-preview.component';

describe('DepartmentPlanPreviewComponent', () => {
  let component: DepartmentPlanPreviewComponent;
  let fixture: ComponentFixture<DepartmentPlanPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentPlanPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentPlanPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
