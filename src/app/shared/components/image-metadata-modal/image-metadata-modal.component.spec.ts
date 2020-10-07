import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMetadataModalComponent } from './image-metadata-modal.component';

describe('ImageMetadataModalComponent', () => {
  let component: ImageMetadataModalComponent;
  let fixture: ComponentFixture<ImageMetadataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageMetadataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMetadataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
