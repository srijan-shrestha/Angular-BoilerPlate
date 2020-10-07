import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1JourneyTwoComponent } from './theme1-journey-two.component';

describe('Theme1JourneyTwoComponent', () => {
  let component: Theme1JourneyTwoComponent;
  let fixture: ComponentFixture<Theme1JourneyTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1JourneyTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1JourneyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
