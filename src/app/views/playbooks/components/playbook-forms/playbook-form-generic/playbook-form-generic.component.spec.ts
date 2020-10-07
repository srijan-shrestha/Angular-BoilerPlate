import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookFormGenericComponent } from './playbook-form-generic.component';

describe('PlaybookFormGenericComponent', () => {
  let component: PlaybookFormGenericComponent;
  let fixture: ComponentFixture<PlaybookFormGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookFormGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookFormGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
