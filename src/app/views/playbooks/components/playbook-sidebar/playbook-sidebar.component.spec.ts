import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookSidebarComponent } from './playbook-sidebar.component';

describe('PlaybookSidebarComponent', () => {
  let component: PlaybookSidebarComponent;
  let fixture: ComponentFixture<PlaybookSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
