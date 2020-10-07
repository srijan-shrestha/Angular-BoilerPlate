import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlanCreateComponent } from './personal-plan-create.component';

describe('PersonalPlanCreateComponent', () => {
  let component: PersonalPlanCreateComponent;
  let fixture: ComponentFixture<PersonalPlanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPlanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPlanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
