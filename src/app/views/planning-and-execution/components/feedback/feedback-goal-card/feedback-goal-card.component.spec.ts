import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackGoalCardComponent } from './feedback-goal-card.component';

describe('FeedbackGoalCardComponent', () => {
  let component: FeedbackGoalCardComponent;
  let fixture: ComponentFixture<FeedbackGoalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackGoalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
