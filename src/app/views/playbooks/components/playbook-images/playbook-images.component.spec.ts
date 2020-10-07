import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookImagesComponent } from './playbook-images.component';

describe('PlaybookImagesComponent', () => {
  let component: PlaybookImagesComponent;
  let fixture: ComponentFixture<PlaybookImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
