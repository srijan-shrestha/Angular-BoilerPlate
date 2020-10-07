import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalSubmittedPhotosComponent } from './cultural-submitted-photos.component';

describe('CulturalSubmittedPhotosComponent', () => {
  let component: CulturalSubmittedPhotosComponent;
  let fixture: ComponentFixture<CulturalSubmittedPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalSubmittedPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalSubmittedPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
