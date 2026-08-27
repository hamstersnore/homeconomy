import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/categories-service';
import { Category } from '../../models/category.model';
import { HomeconomyButton } from "../../../../components/homeconomy-button";

@Component({
  selector: 'app-categories-view',
  imports: [HomeconomyButton],
  templateUrl: './categories-view.html',
})
export class CategoriesView {
  private categoriesService = inject(CategoryService)
  categories = signal<Category[]>([])
  ngOnInit() {
    this.categoriesService.getAll()
      .subscribe({
        next: (result) => {
          this.categories.set(result.Categories)
        },
        error: (error) => console.log('error', error)
      })
  }
}
