import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  inputType = input('text')
  placeholder = input('')
}
