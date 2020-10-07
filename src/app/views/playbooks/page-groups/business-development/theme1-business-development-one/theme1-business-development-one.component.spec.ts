import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1BusinessDevelopmentOneComponent } from './theme1-business-development-one.component';

describe('Theme1BusinessDevelopmentOneComponent', () => {
  let component: Theme1BusinessDevelopmentOneComponent;
  let fixture: ComponentFixture<Theme1BusinessDevelopmentOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1BusinessDevelopmentOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1BusinessDevelopmentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
