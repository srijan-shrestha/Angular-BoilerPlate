import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMissionValuesComponent } from './company-mission-values.component';

describe('CompanyMissionValuesComponent', () => {
  let component: CompanyMissionValuesComponent;
  let fixture: ComponentFixture<CompanyMissionValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMissionValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMissionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
