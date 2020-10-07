import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatPickerComponent } from './dat-picker.component';

describe('DatPickerComponent', () => {
  let component: DatPickerComponent;
  let fixture: ComponentFixture<DatPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
