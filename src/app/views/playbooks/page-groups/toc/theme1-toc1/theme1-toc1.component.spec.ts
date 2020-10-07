import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1Toc1Component } from './theme1-toc1.component';

describe('Theme1Toc1Component', () => {
  let component: Theme1Toc1Component;
  let fixture: ComponentFixture<Theme1Toc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1Toc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1Toc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
