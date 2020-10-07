import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlanPreviewComponent } from './team-plan-preview.component';

describe('TeamPlanPreviewComponent', () => {
  let component: TeamPlanPreviewComponent;
  let fixture: ComponentFixture<TeamPlanPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlanPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlanPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
