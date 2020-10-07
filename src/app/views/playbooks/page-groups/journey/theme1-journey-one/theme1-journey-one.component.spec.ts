import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1JourneyOneComponent } from './theme1-journey-one.component';

describe('Theme1JourneyOneComponent', () => {
  let component: Theme1JourneyOneComponent;
  let fixture: ComponentFixture<Theme1JourneyOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1JourneyOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1JourneyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
