import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningAndExecutionWrapperComponent } from './planning-and-execution-wrapper.component';

describe('PlanningAndExecutionWrapperComponent', () => {
  let component: PlanningAndExecutionWrapperComponent;
  let fixture: ComponentFixture<PlanningAndExecutionWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningAndExecutionWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningAndExecutionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
