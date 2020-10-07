import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoArrayFormComponent } from './two-array-form.component';

describe('TwoArrayFormComponent', () => {
  let component: TwoArrayFormComponent;
  let fixture: ComponentFixture<TwoArrayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoArrayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
