import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalPhotoEventDialogComponent } from './cultural-photo-event-dialog.component';

describe('CulturalPhotoEventDialogComponent', () => {
  let component: CulturalPhotoEventDialogComponent;
  let fixture: ComponentFixture<CulturalPhotoEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalPhotoEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalPhotoEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
