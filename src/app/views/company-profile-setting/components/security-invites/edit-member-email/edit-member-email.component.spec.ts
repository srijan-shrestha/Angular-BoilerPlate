import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberEmailComponent } from './edit-member-email.component';

describe('EditMemberEmailComponent', () => {
  let component: EditMemberEmailComponent;
  let fixture: ComponentFixture<EditMemberEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemberEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
