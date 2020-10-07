import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberRoleComponent } from './edit-member-role.component';

describe('EditMemberRoleComponent', () => {
  let component: EditMemberRoleComponent;
  let fixture: ComponentFixture<EditMemberRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemberRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
