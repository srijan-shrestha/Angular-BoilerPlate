import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterToEditorComponent } from './letter-to-editor.component';

describe('LetterToEditorComponent', () => {
  let component: LetterToEditorComponent;
  let fixture: ComponentFixture<LetterToEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterToEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterToEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
