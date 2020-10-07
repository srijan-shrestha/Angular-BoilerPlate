import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnComponent } from './structure-column.component';

describe('StructureColumnComponent', () => {
  let component: StructureColumnComponent;
  let fixture: ComponentFixture<StructureColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
