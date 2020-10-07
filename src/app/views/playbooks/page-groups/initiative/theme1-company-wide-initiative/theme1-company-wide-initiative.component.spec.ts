import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1CompanyWideInitiativeComponent } from './theme1-company-wide-initiative.component';

describe('Theme1CompanyWideInitiativeComponent', () => {
  let component: Theme1CompanyWideInitiativeComponent;
  let fixture: ComponentFixture<Theme1CompanyWideInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1CompanyWideInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1CompanyWideInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
