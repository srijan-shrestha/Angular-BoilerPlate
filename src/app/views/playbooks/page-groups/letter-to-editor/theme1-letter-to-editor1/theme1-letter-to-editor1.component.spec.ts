import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1LetterToEditor1Component } from './theme1-letter-to-editor1.component';

describe('Theme1LetterToEditor1Component', () => {
  let component: Theme1LetterToEditor1Component;
  let fixture: ComponentFixture<Theme1LetterToEditor1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1LetterToEditor1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1LetterToEditor1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
