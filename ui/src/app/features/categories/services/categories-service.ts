import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CreateCategoryRequest, CreateCategoryResponse, GetCategoriesResponse } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseService = inject(BaseService)
  
  create(request:CreateCategoryRequest):Observable<CreateCategoryResponse>{
    return this.baseService.post('categories', request)
  }

  getAll():Observable<GetCategoriesResponse>{
    return this.baseService.get<GetCategoriesResponse>('categories')
  }
}
