import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CreateAccountRequest } from '../models/create-account.request';
import { Account } from '../models/account.model';
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
