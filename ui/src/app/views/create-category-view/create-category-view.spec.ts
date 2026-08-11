import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryView } from './create-category-view';

describe('CreateCategoryView', () => {
  let component: CreateCategoryView;
  let fixture: ComponentFixture<CreateCategoryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
