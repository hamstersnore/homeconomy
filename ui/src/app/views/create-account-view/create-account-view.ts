import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

interface CreateAccountModel {
  alias: string
}

@Component({
  selector: 'app-create-account-view',
  imports: [],
  templateUrl: './create-account-view.html',
  styleUrl: './create-account-view.css',
})
export class CreateAccountView {
  createAccountModel = signal<CreateAccountModel>(
    {
      alias: ''
    })

  createAccountForm = form(this.createAccountModel)

  onSubmit($event:Event){
    $event.preventDefault()
    
  }
}
