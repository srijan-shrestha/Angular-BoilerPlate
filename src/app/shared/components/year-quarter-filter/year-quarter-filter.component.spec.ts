import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearQuarterFilterComponent } from './year-quarter-filter.component';

describe('YearQuarterFilterComponent', () => {
  let component: YearQuarterFilterComponent;
  let fixture: ComponentFixture<YearQuarterFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearQuarterFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearQuarterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
