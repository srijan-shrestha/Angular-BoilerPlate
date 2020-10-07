import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1CorporateEventsOneComponent } from './theme1-corporate-events-one.component';

describe('Theme1CorporateEventsOneComponent', () => {
  let component: Theme1CorporateEventsOneComponent;
  let fixture: ComponentFixture<Theme1CorporateEventsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1CorporateEventsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1CorporateEventsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
