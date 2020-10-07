import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPlanCreateComponent } from './department-plan-create.component';

describe('DepartmentPlanCreateComponent', () => {
  let component: DepartmentPlanCreateComponent;
  let fixture: ComponentFixture<DepartmentPlanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentPlanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentPlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
