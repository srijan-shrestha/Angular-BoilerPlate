import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionStatementCompanyValuesComponent } from './mission-statement-company-values.component';

describe('MissionStatementCompanyValuesComponent', () => {
  let component: MissionStatementCompanyValuesComponent;
  let fixture: ComponentFixture<MissionStatementCompanyValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionStatementCompanyValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionStatementCompanyValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
