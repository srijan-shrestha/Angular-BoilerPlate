import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionValuesComponent } from './mission-values.component';

describe('MissionValuesComponent', () => {
  let component: MissionValuesComponent;
  let fixture: ComponentFixture<MissionValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
