import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsTodoTypComponent } from './stammbasics-todo-typ.component';

describe('StammbasicsTodoTypComponent', () => {
  let component: StammbasicsTodoTypComponent;
  let fixture: ComponentFixture<StammbasicsTodoTypComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsTodoTypComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsTodoTypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
