import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

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

  signUpModel = signal<SignUpData>({
      username: '',
      password: '',
      repassword: ''
    })

  signUpForm = form(this.signUpModel)

  onSubmit(event:Event){
    this.http.post('/auth/sign-up', this.signUpModel())
    .subscribe({
      next: (result) => {
        this.router.navigate(['/'])
      },
      error: (error) => {

      }
    })
  }

  showError(){
    
  }
}
