import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookBottombarComponent } from './playbook-bottombar.component';

describe('PlaybookBottombarComponent', () => {
  let component: PlaybookBottombarComponent;
  let fixture: ComponentFixture<PlaybookBottombarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookBottombarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookBottombarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
