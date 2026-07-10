import { Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { FormInput } from "../components/form-input/form-input";

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
