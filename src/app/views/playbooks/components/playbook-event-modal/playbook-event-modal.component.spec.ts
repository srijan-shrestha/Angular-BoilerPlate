import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookEventModalComponent } from './playbook-event-modal.component';

describe('PlaybookEventModalComponent', () => {
  let component: PlaybookEventModalComponent;
  let fixture: ComponentFixture<PlaybookEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
