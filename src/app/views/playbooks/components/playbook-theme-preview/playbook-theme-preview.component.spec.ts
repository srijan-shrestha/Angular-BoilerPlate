import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookThemePreviewComponent } from './playbook-theme-preview.component';

describe('PlaybookThemePreviewComponent', () => {
  let component: PlaybookThemePreviewComponent;
  let fixture: ComponentFixture<PlaybookThemePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookThemePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookThemePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
