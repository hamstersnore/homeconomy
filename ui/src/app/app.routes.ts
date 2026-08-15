import { Routes } from '@angular/router';
import { SignUpView } from './views/sign-up-view/sign-up-view';
import { SignInForm } from './sign-in-form/sign-in-form';
import { GetTransactions } from './get-transactions/get-transactions'
import { Dashboard } from './dashboard/dashboard';
import { CreateCategory } from './create-category/create-category';
import { OnboardingView } from './views/onboarding-view/onboarding-view';
import { CreateAccountView } from './views/create-account-view/create-account-view';
import { AccountsView } from './views/accounts-view/accounts-view';
import { CreateTransactionView } from './views/create-transaction-view/create-transaction-view';
import { CategoriesView } from './views/categories-view/categories-view';
import { CreateCategoryView } from './views/create-category-view/create-category-view';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpView },
    { path: 'sign-in', component: SignInForm },
    { path: 'create-transaction', component: CreateTransactionView },
    { path: 'transactions', component: GetTransactions },
    { path: 'dashboard', component: Dashboard },
    { path: 'categories/new', component: CreateCategory },
    { path: 'onboarding', component: OnboardingView },
    { path: 'create-account', component: CreateAccountView },
    { path: 'accounts', component: AccountsView },
    { path: 'categories', component: CategoriesView },
    { path: 'create-category', component: CreateCategoryView },
];
