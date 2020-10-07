import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1ArticleTwoComponent } from './theme1-article-two.component';

describe('Theme1ArticleTwoComponent', () => {
  let component: Theme1ArticleTwoComponent;
  let fixture: ComponentFixture<Theme1ArticleTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1ArticleTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1ArticleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
