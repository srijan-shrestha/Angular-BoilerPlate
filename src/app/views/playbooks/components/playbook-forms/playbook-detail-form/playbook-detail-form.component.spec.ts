import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookDetailFormComponent } from './playbook-detail-form.component';

describe('PlaybookDetailFormComponent', () => {
  let component: PlaybookDetailFormComponent;
  let fixture: ComponentFixture<PlaybookDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
