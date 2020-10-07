import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalPhotosApproveComponent } from './cultural-photos-approve.component';

describe('CulturalPhotosApproveComponent', () => {
  let component: CulturalPhotosApproveComponent;
  let fixture: ComponentFixture<CulturalPhotosApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalPhotosApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalPhotosApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
