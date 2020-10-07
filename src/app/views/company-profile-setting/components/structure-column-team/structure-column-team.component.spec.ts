import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureColumnTeamComponent } from './structure-column-team.component';

describe('StructureColumnTeamComponent', () => {
  let component: StructureColumnTeamComponent;
  let fixture: ComponentFixture<StructureColumnTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureColumnTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureColumnTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
