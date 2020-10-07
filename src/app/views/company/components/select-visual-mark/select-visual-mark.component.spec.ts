import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVisualMarkComponent } from './select-visual-mark.component';

describe('SelectVisualMarkComponent', () => {
  let component: SelectVisualMarkComponent;
  let fixture: ComponentFixture<SelectVisualMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVisualMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVisualMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
