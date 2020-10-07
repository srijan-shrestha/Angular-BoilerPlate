import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalPhotosStepperComponent } from './cultural-photos-stepper.component';

describe('CulturalPhotosStepperComponent', () => {
  let component: CulturalPhotosStepperComponent;
  let fixture: ComponentFixture<CulturalPhotosStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalPhotosStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalPhotosStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
