import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyContainerComponent } from './admin-company-container.component';

describe('AdminCompanyContainerComponent', () => {
  let component: AdminCompanyContainerComponent;
  let fixture: ComponentFixture<AdminCompanyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
