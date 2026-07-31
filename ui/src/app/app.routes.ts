import { Routes } from '@angular/router';
import { SignUpForm } from './sign-up-form/sign-up-form';
import { SignInForm } from './sign-in-form/sign-in-form';
import { CreateTransaction } from './create-transaction/create-transaction';
import { GetTransactions } from './get-transactions/get-transactions'
import { Dashboard } from './dashboard/dashboard';
import { CreateCategory } from './create-category/create-category';
import { OnboardingView } from './views/onboarding-view/onboarding-view';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpForm },
    { path: 'sign-in', component: SignInForm },
    { path: 'create-transaction', component: CreateTransaction },
    { path: 'transactions', component: GetTransactions },
    { path: 'dashboard', component: Dashboard },
    { path: 'categories/new', component: CreateCategory},
    { path: 'onboarding', component: OnboardingView},
];
