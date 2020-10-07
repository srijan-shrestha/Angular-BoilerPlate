import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOverviewComponent } from './personal-overview.component';

describe('PersonalOverviewComponent', () => {
  let component: PersonalOverviewComponent;
  let fixture: ComponentFixture<PersonalOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
