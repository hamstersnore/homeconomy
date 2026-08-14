import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '../services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

interface SignInModel {
  Username: string;
  Password: string;
}

@Component({
  selector: 'app-sign-in-form',
  imports: [FormField, RouterLink],
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
    
    this.authService.signIn(this.signInModel().Username, this.signInModel().Password)
      .subscribe({
        next: (response) => {
          if (response.authToken.length > 0){
            this.authService.setToken(response.authToken)
            this.router.navigate(['/dashboard'])
          }
        },
        error: (error) => {
          console.log('Error !', error)
        }
      })
  }
}
