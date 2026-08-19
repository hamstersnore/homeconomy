import { Routes } from '@angular/router';
import { SignUpView } from './features/sign-up/views/sign-up-view/sign-up-view';
import { GetTransactions } from './features/transactions/views/get-transactions/get-transactions'
import { Dashboard } from './dashboard/views/dashboard';
import { OnboardingView } from './features/onboarding/onboarding-view/onboarding-view';
import { CreateAccountView } from './features/accounts/views/create-account-view/create-account-view';
import { CreateTransactionView } from './features/transactions/views/create-transaction-view/create-transaction-view';
import { CreateCategoryView } from './features/categories/views/create-category-view/create-category-view';
import { SignInForm } from './features/sign-in/views/sign-in-form/sign-in-form';
import { AccountsView } from './features/accounts/views/accounts-view/accounts-view';
import { CategoriesView } from './features/categories/views/categories-view/categories-view';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpView },
    { path: 'sign-in', component: SignInForm },
    { path: 'create-transaction', component: CreateTransactionView },
    { path: 'transactions', component: GetTransactions },
    { path: 'dashboard', component: Dashboard },
    { path: 'categories/new', component: CreateCategoryView },
    { path: 'onboarding', component: OnboardingView },
    { path: 'create-account', component: CreateAccountView },
    { path: 'accounts', component: AccountsView },
    { path: 'categories', component: CategoriesView },
    { path: 'create-category', component: CreateCategoryView },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

];
