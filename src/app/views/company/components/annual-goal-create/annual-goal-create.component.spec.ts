import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AnnualGoalCreateComponent} from './annual-goal-create.component';



describe('InitiativeCardComponent', () => {
  let component: AnnualGoalCreateComponent;
  let fixture: ComponentFixture<AnnualGoalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualGoalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualGoalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
