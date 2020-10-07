import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSkyBlueComponent } from './theme-sky-blue.component';

describe('ThemeSkyBlueComponent', () => {
  let component: ThemeSkyBlueComponent;
  let fixture: ComponentFixture<ThemeSkyBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSkyBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSkyBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
