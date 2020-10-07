import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBiosOneComponent } from './company-bios-one.component';

describe('CompanyBiosOneComponent', () => {
  let component: CompanyBiosOneComponent;
  let fixture: ComponentFixture<CompanyBiosOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBiosOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBiosOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
