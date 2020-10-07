import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyTeamGoalsComponent } from './quarterly-team-goals.component';

describe('QuarterlyTeamGoalsComponent', () => {
  let component: QuarterlyTeamGoalsComponent;
  let fixture: ComponentFixture<QuarterlyTeamGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterlyTeamGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyTeamGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
