import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StammbasicsDocumentCategoryComponent } from './stammbasics-document-category.component';

describe('StammbasicsDocumentCategoryComponent', () => {
  let component: StammbasicsDocumentCategoryComponent;
  let fixture: ComponentFixture<StammbasicsDocumentCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StammbasicsDocumentCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StammbasicsDocumentCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
