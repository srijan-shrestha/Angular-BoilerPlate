import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFilterDialogComponent } from './member-filter-dialog.component';

describe('MemberFilterDialogComponent', () => {
  let component: MemberFilterDialogComponent;
  let fixture: ComponentFixture<MemberFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
