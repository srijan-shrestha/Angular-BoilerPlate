import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageEditComponent } from './profile-image-edit.component';

describe('PlaybookImageEditComponent', () => {
  let component: ProfileImageEditComponent;
  let fixture: ComponentFixture<ProfileImageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileImageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
