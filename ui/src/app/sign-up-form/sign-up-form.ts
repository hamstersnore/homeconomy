import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, schema, validate } from '@angular/forms/signals';
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

  signUpForm = form(this.signUpModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'}),
    required(schemaPath.password, {message: 'Password is required'}),
    required(schemaPath.repassword, {message: 'Password repetition is required'}),
    validate(schemaPath.repassword, ({value, valueOf}) => {
      const rePassword = value();
      const password = valueOf(schemaPath.password);

      if (rePassword !== password){
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match'
        }
      }

      return null;
    });
  })

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
