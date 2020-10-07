import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnLeadershipComponent } from './structure-column-leadership.component';

describe('StructureColumnLeadershipComponent', () => {
  let component: StructureColumnLeadershipComponent;
  let fixture: ComponentFixture<StructureColumnLeadershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnLeadershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
