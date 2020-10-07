import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemePreviewSideBarComponent } from './theme-preview-side-bar.component';

describe('ThemePreviewSideBarComponent', () => {
  let component: ThemePreviewSideBarComponent;
  let fixture: ComponentFixture<ThemePreviewSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemePreviewSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePreviewSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
