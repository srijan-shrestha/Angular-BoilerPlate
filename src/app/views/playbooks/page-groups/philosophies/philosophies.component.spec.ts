import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosophiesComponent } from './philosophies.component';

describe('PhilosophiesComponent', () => {
  let component: PhilosophiesComponent;
  let fixture: ComponentFixture<PhilosophiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhilosophiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhilosophiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
