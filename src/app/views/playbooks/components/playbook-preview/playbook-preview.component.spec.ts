import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookPreviewComponent } from './playbook-preview.component';

describe('PlaybookPreviewComponent', () => {
  let component: PlaybookPreviewComponent;
  let fixture: ComponentFixture<PlaybookPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
