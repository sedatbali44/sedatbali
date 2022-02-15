import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsRepairStatusComponent } from './stammbasics-repair-status.component';

describe('StammbasicsRepairStatusComponent', () => {
  let component: StammbasicsRepairStatusComponent;
  let fixture: ComponentFixture<StammbasicsRepairStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsRepairStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsRepairStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
