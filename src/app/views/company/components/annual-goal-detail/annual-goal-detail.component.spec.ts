import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AnnualGoalDetailComponent} from './annual-goal-detail.component';


describe('InitiativeDetailComponent', () => {
  let component: AnnualGoalDetailComponent;
  let fixture: ComponentFixture<AnnualGoalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualGoalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualGoalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
