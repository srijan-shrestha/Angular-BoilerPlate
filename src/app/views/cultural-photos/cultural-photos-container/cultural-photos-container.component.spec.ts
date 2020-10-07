import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalPhotosContainerComponent } from './cultural-photos-container.component';

describe('CulturalPhotosContainerComponent', () => {
  let component: CulturalPhotosContainerComponent;
  let fixture: ComponentFixture<CulturalPhotosContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalPhotosContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalPhotosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
