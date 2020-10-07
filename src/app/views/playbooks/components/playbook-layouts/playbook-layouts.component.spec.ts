import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookLayoutsComponent } from './playbook-layouts.component';

describe('PlaybookLayoutsComponent', () => {
  let component: PlaybookLayoutsComponent;
  let fixture: ComponentFixture<PlaybookLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
