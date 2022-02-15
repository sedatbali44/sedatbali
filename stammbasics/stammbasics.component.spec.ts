import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsNewComponent } from './stammbasics-new.component';

describe('StammbasicsNewComponent', () => {
  let component: StammbasicsNewComponent;
  let fixture: ComponentFixture<StammbasicsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
