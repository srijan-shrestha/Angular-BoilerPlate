import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAnnualInitiativesBar } from './preview-annual-initiatives-bar.component';

describe('PreviewAnnualInitiativesBar', () => {
  let component: PreviewAnnualInitiativesBar;
  let fixture: ComponentFixture<PreviewAnnualInitiativesBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAnnualInitiativesBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAnnualInitiativesBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
