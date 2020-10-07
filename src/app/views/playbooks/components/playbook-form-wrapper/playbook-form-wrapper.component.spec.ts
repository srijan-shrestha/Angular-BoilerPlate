import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookFormWrapperComponent } from './playbook-form-wrapper.component';

describe('PlaybookFormWrapperComponent', () => {
  let component: PlaybookFormWrapperComponent;
  let fixture: ComponentFixture<PlaybookFormWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookFormWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
