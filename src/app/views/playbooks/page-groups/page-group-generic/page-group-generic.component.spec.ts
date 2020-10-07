import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupGenericComponent } from './page-group-generic.component';

describe('PageGroupGenericComponent', () => {
  let component: PageGroupGenericComponent;
  let fixture: ComponentFixture<PageGroupGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
