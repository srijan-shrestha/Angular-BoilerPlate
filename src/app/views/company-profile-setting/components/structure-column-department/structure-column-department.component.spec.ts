import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnDepartmentComponent } from './structure-column-department.component';

describe('StructureColumnDepartmentComponent', () => {
  let component: StructureColumnDepartmentComponent;
  let fixture: ComponentFixture<StructureColumnDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
