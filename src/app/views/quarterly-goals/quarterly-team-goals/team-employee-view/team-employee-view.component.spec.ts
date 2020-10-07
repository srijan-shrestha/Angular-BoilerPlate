import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEmployeeViewComponent } from './team-employee-view.component';

describe('TeamEmployeeViewComponent', () => {
  let component: TeamEmployeeViewComponent;
  let fixture: ComponentFixture<TeamEmployeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEmployeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
