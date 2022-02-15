import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsCustomerStatusComponent } from './stammbasics-customer-status.component';

describe('StammbasicsCustomerStatusComponent', () => {
  let component: StammbasicsCustomerStatusComponent;
  let fixture: ComponentFixture<StammbasicsCustomerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsCustomerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsCustomerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
