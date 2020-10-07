import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInitiativeCardComponent } from './feedback-initiative-card.component';

describe('FeedbackInitiativeCardComponent', () => {
  let component: FeedbackInitiativeCardComponent;
  let fixture: ComponentFixture<FeedbackInitiativeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackInitiativeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackInitiativeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
