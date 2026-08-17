import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { CategoryService } from '../../services/categories-service';
import { Router } from '@angular/router';

interface CreateCategoryModel {
  Alias:string
  Description:string
}

@Component({
  selector: 'app-create-category-view',
  imports: [FormField],
  templateUrl: './create-category-view.html',
})
export class CreateCategoryView {
  private categoriesService = inject(CategoryService)
  private router = inject(Router)
  createCategoryModel = signal<CreateCategoryModel>({
    Alias: '',
    Description: ''
  })

  createCategoryForm = form(this.createCategoryModel)

  onSubmit($event:Event){
    $event.preventDefault()
    console.log(this.createCategoryModel())
    this.categoriesService.create({
      Name: this.createCategoryModel().Alias,
      Description: this.createCategoryModel().Description
    }).subscribe({
      next: (result) => {
        console.log(result)
        if (result?.NewCategory?.Id != 0){
          this.router.navigate(['/categories'])
        }
      },
      error: (error) => console.log('error', error)
    })
  }
}
