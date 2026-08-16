import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AccountsService } from '../../services/accounts/accounts-service';
import { Router } from '@angular/router';

interface CreateAccountModel {
  alias: string
}

@Component({
  selector: 'app-create-account-view',
  imports: [FormField],
  templateUrl: './create-account-view.html',
})
export class CreateAccountView {
  svc = inject(AccountsService)
  router = inject(Router)

  createAccountModel = signal<CreateAccountModel>(
    {
      alias: ''
    })

  createAccountForm = form(this.createAccountModel, (schemaPath) => {
    required(schemaPath.alias, { message: 'Alias is required'})
  })

  onSubmit($event:Event){
    $event.preventDefault()
    this.svc.create({
      account_alias: this.createAccountModel().alias
    })
    .subscribe({
      next: (result) => {
        console.log('success', result)
        this.router.navigate(['/accounts'])
      },
      error: (error) => console.log('error', error)
    })
    
    
  }
}
