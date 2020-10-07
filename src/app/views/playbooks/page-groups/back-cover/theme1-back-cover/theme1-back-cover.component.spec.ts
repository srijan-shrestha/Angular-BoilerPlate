import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1BackCoverComponent } from './theme1-back-cover.component';

describe('Theme1BackCoverComponent', () => {
  let component: Theme1BackCoverComponent;
  let fixture: ComponentFixture<Theme1BackCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1BackCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1BackCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
