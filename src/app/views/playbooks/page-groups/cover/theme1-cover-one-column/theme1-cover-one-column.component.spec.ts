import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1CoverOneColumnComponent } from './theme1-cover-one-column.component';

describe('Theme1CoverOneColumnComponent', () => {
  let component: Theme1CoverOneColumnComponent;
  let fixture: ComponentFixture<Theme1CoverOneColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1CoverOneColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1CoverOneColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
