import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalPhotosUploadComponent } from './cultural-photos-upload.component';

describe('CulturalPhotosUploadComponent', () => {
  let component: CulturalPhotosUploadComponent;
  let fixture: ComponentFixture<CulturalPhotosUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalPhotosUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalPhotosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
