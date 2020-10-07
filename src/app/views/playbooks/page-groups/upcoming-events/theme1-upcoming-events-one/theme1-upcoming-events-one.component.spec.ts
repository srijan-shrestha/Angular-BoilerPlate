import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1UpcomingEventsOneComponent } from './theme1-upcoming-events-one.component';

describe('Theme1UpcomingEventsOneComponent', () => {
  let component: Theme1UpcomingEventsOneComponent;
  let fixture: ComponentFixture<Theme1UpcomingEventsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1UpcomingEventsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1UpcomingEventsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
