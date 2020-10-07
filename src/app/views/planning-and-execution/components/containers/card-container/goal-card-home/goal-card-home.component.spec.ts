import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCardHomeComponent } from './goal-card-home.component';

describe('GoalCardHomeComponent', () => {
  let component: GoalCardHomeComponent;
  let fixture: ComponentFixture<GoalCardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalCardHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
