import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualGoalsComponent } from './annual-goals.component';

describe('AnnualGoalsComponent', () => {
  let component: AnnualGoalsComponent;
  let fixture: ComponentFixture<AnnualGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
