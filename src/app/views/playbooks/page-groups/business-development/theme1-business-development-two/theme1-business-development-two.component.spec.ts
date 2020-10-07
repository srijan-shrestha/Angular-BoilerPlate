import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1BusinessDevelopmentTwoComponent } from './theme1-business-development-two.component';

describe('Theme1BusinessDevelopmentTwoComponent', () => {
  let component: Theme1BusinessDevelopmentTwoComponent;
  let fixture: ComponentFixture<Theme1BusinessDevelopmentTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1BusinessDevelopmentTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1BusinessDevelopmentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
