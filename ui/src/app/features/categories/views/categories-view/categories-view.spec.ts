import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesView } from './categories-view';

describe('CategoriesView', () => {
  let component: CategoriesView;
  let fixture: ComponentFixture<CategoriesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
