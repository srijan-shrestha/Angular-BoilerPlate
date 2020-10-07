import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationApproveDialogComponent } from './confirmation-approve-dialog.component';

describe('ConfirmationApproveDialogComponent', () => {
  let component: ConfirmationApproveDialogComponent;
  let fixture: ComponentFixture<ConfirmationApproveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationApproveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
