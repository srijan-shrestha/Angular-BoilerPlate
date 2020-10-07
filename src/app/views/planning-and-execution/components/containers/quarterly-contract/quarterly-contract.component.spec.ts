import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyContractComponent } from './quarterly-contract.component';

describe('QuarterlyContractComponent', () => {
  let component: QuarterlyContractComponent;
  let fixture: ComponentFixture<QuarterlyContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterlyContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
