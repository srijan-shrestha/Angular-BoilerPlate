import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlanPreviewComponent } from './personal-plan-preview.component';

describe('PersonalPlanPreviewComponent', () => {
  let component: PersonalPlanPreviewComponent;
  let fixture: ComponentFixture<PersonalPlanPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPlanPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPlanPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
