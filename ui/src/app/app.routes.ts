import { Routes } from '@angular/router';
import { SignUpForm } from './sign-up-form/sign-up-form';
import { SignInForm } from './sign-in-form/sign-in-form';
import { CreateTransaction } from './create-transaction/create-transaction';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpForm },
    { path: 'sign-in', component: SignInForm },
    { path: 'create-transaction', component: CreateTransaction}
];
