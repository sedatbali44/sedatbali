import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsVoComponent } from './stammbasics-vo.component';

describe('StammbasicsVoComponent', () => {
  let component: StammbasicsVoComponent;
  let fixture: ComponentFixture<StammbasicsVoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsVoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsVoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
