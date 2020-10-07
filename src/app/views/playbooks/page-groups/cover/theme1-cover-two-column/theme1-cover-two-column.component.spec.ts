import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1CoverTwoColumnComponent } from './theme1-cover-two-column.component';

describe('Theme1CoverTwoColumnComponent', () => {
  let component: Theme1CoverTwoColumnComponent;
  let fixture: ComponentFixture<Theme1CoverTwoColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1CoverTwoColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1CoverTwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
