import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { CreateCategoryRequest } from './create-category.request';
import { CreateCategoryResponse } from './create-category.response';
import { Observable } from 'rxjs';
import { GetCategoriesResponse } from './get-categories.response';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseService = inject(BaseService)
  
  create(request:CreateCategoryRequest):Observable<CreateCategoryResponse>{
    return this.baseService.post('categories', request)
  }

  getAll():Observable<GetCategoriesResponse>{
    return this.baseService.get<GetCategoriesResponse>('categories')
  }
}
