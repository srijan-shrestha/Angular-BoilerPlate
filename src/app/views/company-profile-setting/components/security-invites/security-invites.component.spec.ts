import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityInvitesComponent } from './security-invites.component';

describe('SecurityInvitesComponent', () => {
  let component: SecurityInvitesComponent;
  let fixture: ComponentFixture<SecurityInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
