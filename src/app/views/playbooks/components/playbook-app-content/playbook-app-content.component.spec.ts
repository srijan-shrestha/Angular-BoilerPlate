import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookAppContentComponent } from './playbook-app-content.component';

describe('PlaybookAppContentComponent', () => {
  let component: PlaybookAppContentComponent;
  let fixture: ComponentFixture<PlaybookAppContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookAppContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookAppContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
