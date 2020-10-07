import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookImageEditComponent } from './playbook-image-edit.component';

describe('PlaybookImageEditComponent', () => {
  let component: PlaybookImageEditComponent;
  let fixture: ComponentFixture<PlaybookImageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookImageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
