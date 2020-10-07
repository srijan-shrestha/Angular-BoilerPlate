import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookDetailComponent } from './playbook-detail.component';

describe('PlaybookDetailComponent', () => {
  let component: PlaybookDetailComponent;
  let fixture: ComponentFixture<PlaybookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
