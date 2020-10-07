import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileSettingComponent } from './company-profile-setting.component';

describe('CompanyProfileSettingComponent', () => {
  let component: CompanyProfileSettingComponent;
  let fixture: ComponentFixture<CompanyProfileSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfileSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
