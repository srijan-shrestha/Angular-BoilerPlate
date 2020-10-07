import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnDivisionComponent } from './structure-column-division.component';

describe('StructureColumnDivisionComponent', () => {
  let component: StructureColumnDivisionComponent;
  let fixture: ComponentFixture<StructureColumnDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
