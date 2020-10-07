import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookPublishComponent } from './playbook-publish.component';

describe('PlaybookPublishComponent', () => {
  let component: PlaybookPublishComponent;
  let fixture: ComponentFixture<PlaybookPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
