import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnMemberComponent } from './structure-column-member.component';

describe('StructureColumnMemberComponent', () => {
  let component: StructureColumnMemberComponent;
  let fixture: ComponentFixture<StructureColumnMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
