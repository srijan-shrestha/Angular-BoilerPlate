import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookImageMetadataModalComponent } from './playbook-image-metadata-modal.component';

describe('PlaybookImageMetadataModalComponent', () => {
  let component: PlaybookImageMetadataModalComponent;
  let fixture: ComponentFixture<PlaybookImageMetadataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookImageMetadataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookImageMetadataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
