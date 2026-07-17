import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

interface SignUpData {
  username: string;
  password: string;
  repassword: string;
}

@Component({
  selector: 'sign-up-form',
  imports: [FormField],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css',
})
export class SignUpForm {
  private http = inject(HttpClient)
  private router = inject(Router)
  private service = inject(AuthService)

  signUpModel = signal<SignUpData>({
      username: '',
      password: '',
      repassword: ''
    })

  isError = signal(false)

  signUpForm = form(this.signUpModel)

  onSubmit(event:Event){
    var isError = this.service.signUp(
      this.signUpModel().username, 
      this.signUpModel().password)
    if (isError) {
      this.isError.set(true)
    }
  }

  showError(){

  }
}
