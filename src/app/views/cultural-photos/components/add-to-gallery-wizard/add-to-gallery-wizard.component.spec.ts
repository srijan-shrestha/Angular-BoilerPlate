import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToGalleryWizardComponent } from './add-to-gallery-wizard.component';

describe('AddToGalleryWizardComponent', () => {
  let component: AddToGalleryWizardComponent;
  let fixture: ComponentFixture<AddToGalleryWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToGalleryWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToGalleryWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
