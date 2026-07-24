import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

interface SignInModel {
  Username: string;
  Password: string;
}

@Component({
  selector: 'app-sign-in-form',
  imports: [FormField],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css',
})
export class SignInForm {

  signInModel = signal<SignInModel>({
    Username: '',
    Password: ''
  })

  signInForm = form(this.signInModel)

  onSubmit(event:Event){
    console.log(this.signInModel().Username, this.signInModel().Password)
    // POST /api/auth/sign-in
  }

}
