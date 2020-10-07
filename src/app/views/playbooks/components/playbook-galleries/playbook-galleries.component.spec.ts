import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookGalleriesComponent } from './playbook-galleries.component';

describe('PlaybookGalleriesComponent', () => {
  let component: PlaybookGalleriesComponent;
  let fixture: ComponentFixture<PlaybookGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
