import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1ArticleOneComponent } from './theme1-article-one.component';

describe('Theme1ArticleOneComponent', () => {
  let component: Theme1ArticleOneComponent;
  let fixture: ComponentFixture<Theme1ArticleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1ArticleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1ArticleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
