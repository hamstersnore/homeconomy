import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { CreateAccountRequest } from './create-account.request';
import { Account } from './account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  baseService = inject(BaseService)

  create(request:CreateAccountRequest):Observable<Account>{
    return this.baseService.post('accounts', request)
  }

  getAll():Observable<Account[]>{
    return this.baseService.get('accounts')
  }
}
