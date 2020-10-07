import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteDialogComponent } from './confirmation-delete-dialog.component';

describe('ConfirmationDeleteDialogComponent', () => {
  let component: ConfirmationDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmationDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
