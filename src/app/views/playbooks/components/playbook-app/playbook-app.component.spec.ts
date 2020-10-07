import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookAppComponent } from './playbook-app.component';

describe('PlaybookAppComponent', () => {
  let component: PlaybookAppComponent;
  let fixture: ComponentFixture<PlaybookAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
