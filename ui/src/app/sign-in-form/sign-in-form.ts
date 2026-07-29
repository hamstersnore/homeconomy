import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '../services/auth/auth-service';
import { Router } from '@angular/router';

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

  authService = inject(AuthService)
  router = inject(Router)

  signInModel = signal<SignInModel>({
    Username: '',
    Password: ''
  })

  signInForm = form(this.signInModel)

  onSubmit(event:Event){
    event.preventDefault()
    
    var isOk = this.authService.signIn(this.signInModel().Username, this.signInModel().Password);

    if (isOk){
      this.router.navigate(['/dashboard'])
    }
  }

}
