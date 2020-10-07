import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1ProblemSolutionComponent } from './theme1-problem-solution.component';

describe('ProblemSolutionComponent', () => {
  let component: Theme1ProblemSolutionComponent;
  let fixture: ComponentFixture<Theme1ProblemSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1ProblemSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1ProblemSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
