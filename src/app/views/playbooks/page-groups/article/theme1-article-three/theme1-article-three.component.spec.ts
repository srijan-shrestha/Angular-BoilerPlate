import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1ArticleThreeComponent } from './theme1-article-three.component';

describe('Theme1ArticleThreeComponent', () => {
  let component: Theme1ArticleThreeComponent;
  let fixture: ComponentFixture<Theme1ArticleThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1ArticleThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1ArticleThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
