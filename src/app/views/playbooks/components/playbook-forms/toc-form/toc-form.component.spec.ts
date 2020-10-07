import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TocFormComponent } from './toc-form.component';

describe('TocFormComponent', () => {
  let component: TocFormComponent;
  let fixture: ComponentFixture<TocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
