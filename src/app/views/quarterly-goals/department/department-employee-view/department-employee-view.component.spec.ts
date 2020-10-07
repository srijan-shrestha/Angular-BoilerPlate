import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEmployeeViewComponent } from './department-employee-view.component';

describe('DepartmentEmployeeViewComponent', () => {
  let component: DepartmentEmployeeViewComponent;
  let fixture: ComponentFixture<DepartmentEmployeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEmployeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
