import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormWrapperComponent } from './company-form-wrapper.component';

describe('CompanyFormWrapperComponent', () => {
  let component: CompanyFormWrapperComponent;
  let fixture: ComponentFixture<CompanyFormWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFormWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
