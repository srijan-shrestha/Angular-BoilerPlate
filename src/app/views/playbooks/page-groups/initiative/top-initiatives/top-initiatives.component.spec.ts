import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInitiativesComponent } from './top-initiatives.component';

describe('TopInitiativesComponent', () => {
  let component: TopInitiativesComponent;
  let fixture: ComponentFixture<TopInitiativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopInitiativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInitiativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
