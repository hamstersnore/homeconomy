import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/categories-service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories-view',
  imports: [DatePipe, RouterLink],
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
