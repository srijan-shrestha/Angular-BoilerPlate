import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybooksListComponent } from './playbooks-list.component';

describe('PlaybooksListComponent', () => {
  let component: PlaybooksListComponent;
  let fixture: ComponentFixture<PlaybooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybooksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
