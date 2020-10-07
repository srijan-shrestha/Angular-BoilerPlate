import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookCreationWizardComponent } from './playbook-creation-wizard.component';

describe('PlaybookCreationWizardComponent', () => {
  let component: PlaybookCreationWizardComponent;
  let fixture: ComponentFixture<PlaybookCreationWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookCreationWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookCreationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
