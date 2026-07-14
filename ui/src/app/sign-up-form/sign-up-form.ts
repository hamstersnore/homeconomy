import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

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
  signUpModel = signal<SignUpData>({
      username: '',
      password: '',
      repassword: ''
    })

  signUpForm = form(this.signUpModel)
}
