import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1GoalOneComponent } from './theme1-goal-one.component';

describe('Theme1GoalOneComponent', () => {
  let component: Theme1GoalOneComponent;
  let fixture: ComponentFixture<Theme1GoalOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1GoalOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1GoalOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
