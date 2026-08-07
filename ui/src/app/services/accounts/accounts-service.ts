import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { CreateAccountRequest } from './create-account.request';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  baseService = inject(BaseService)

  create(request:CreateAccountRequest):Account[]{
    return this.baseService.post('accounts', request)
  }
}
