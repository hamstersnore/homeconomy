import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories-service';
import { Category } from '../../services/categories/category.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-view',
  imports: [DatePipe, RouterLink],
  templateUrl: './categories-view.html',
})
export class CategoriesView {
  private categoriesService = inject(CategoriesService)
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
