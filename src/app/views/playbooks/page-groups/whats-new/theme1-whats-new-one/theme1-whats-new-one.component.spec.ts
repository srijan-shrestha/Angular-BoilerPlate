import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1WhatsNewOneComponent } from './theme1-whats-new-one.component';

describe('Theme1WhatsNewOneComponent', () => {
  let component: Theme1WhatsNewOneComponent;
  let fixture: ComponentFixture<Theme1WhatsNewOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme1WhatsNewOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1WhatsNewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
