import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1CorporateEventsTwoComponent } from './theme1-corporate-events-two.component';

describe('Theme1CorporateEventsTwoComponent', () => {
  let component: Theme1CorporateEventsTwoComponent;
  let fixture: ComponentFixture<Theme1CorporateEventsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1CorporateEventsTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1CorporateEventsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
