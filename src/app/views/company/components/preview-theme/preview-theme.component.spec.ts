import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewThemeComponent } from './preview-theme.component';

describe('PreviewThemeComponent', () => {
  let component: PreviewThemeComponent;
  let fixture: ComponentFixture<PreviewThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
