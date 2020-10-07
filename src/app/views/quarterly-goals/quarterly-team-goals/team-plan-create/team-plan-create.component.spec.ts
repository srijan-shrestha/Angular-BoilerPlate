import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlanCreateComponent } from './team-plan-create.component';

describe('TeamPlanCreateComponent', () => {
  let component: TeamPlanCreateComponent;
  let fixture: ComponentFixture<TeamPlanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
