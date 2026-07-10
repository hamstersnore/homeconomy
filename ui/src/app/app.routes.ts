import { Routes } from '@angular/router';
import { SignUpForm } from './sign-up-form/sign-up-form';
import { SignInForm } from './sign-in-form/sign-in-form';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpForm },
    { path: 'sign-in', component: SignInForm }
];
