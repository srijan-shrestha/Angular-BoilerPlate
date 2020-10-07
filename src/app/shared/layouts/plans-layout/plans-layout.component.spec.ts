import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansLayoutComponent } from './plans-layout.component';

describe('PlansLayoutComponent', () => {
  let component: PlansLayoutComponent;
  let fixture: ComponentFixture<PlansLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
