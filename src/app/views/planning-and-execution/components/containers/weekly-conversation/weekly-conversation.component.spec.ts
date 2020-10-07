import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyConversationComponent } from './weekly-conversation.component';

describe('WeeklyConversationComponent', () => {
  let component: WeeklyConversationComponent;
  let fixture: ComponentFixture<WeeklyConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
