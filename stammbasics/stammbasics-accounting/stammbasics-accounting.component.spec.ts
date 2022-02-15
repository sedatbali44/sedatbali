import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsAccountingComponent } from './stammbasics-accounting.component';

describe('StammbasicsAccountComponent', () => {
  let component: StammbasicsAccountingComponent;
  let fixture: ComponentFixture<StammbasicsAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
