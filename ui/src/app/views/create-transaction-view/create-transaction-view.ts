import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AccountsService } from '../../services/accounts/accounts-service';
import { Account } from '../../services/accounts/account.model';
import { Category } from '../../services/categories/category.model';
import { CategoriesService } from '../../services/categories/categories-service';
import { TransactionService } from '../../services/transactions/transaction.service';
import { TransactionRequest } from '../../services/transactions/transaction.request';

export interface CreateTransactionFormModel {
  AccountId:string
	Amount:number
	Concept:string
	CategoryId:string
  ExecutionDate:Date
	BudgetId:number|null
}

@Component({
  selector: 'app-create-transaction',
  imports: [FormField],
  templateUrl: './create-transaction-view.html',
})
export class CreateTransactionView {
  private httpClient = inject(HttpClient);
  private router = inject(Router)
  private accountsService = inject(AccountsService)
  private categoriesService = inject(CategoriesService)
  private transactionService = inject(TransactionService)
  accounts = signal<Account[]>([])
  categories = signal<Category[]>([])

  createTransactionModel = signal<CreateTransactionFormModel>({
    AccountId: '',
    Concept: '',
    Amount: 0.00,
    BudgetId: null,
    CategoryId: '',
    ExecutionDate: new Date(Date.now())
  })

  createTransactionForm = form(this.createTransactionModel)

  onSubmit(event: Event){
    event.preventDefault();
    this.transactionService.createTransaction({
      AccountId: parseInt(this.createTransactionModel().AccountId),
      Amount: this.createTransactionModel().Amount,
      BudgetId: this.createTransactionModel().BudgetId,
      CategoryId: parseInt(this.createTransactionModel().CategoryId),
      Concept: this.createTransactionModel().Concept,
      ExecutionDate: this.createTransactionModel().ExecutionDate
    }).subscribe({
      next: result => {
        console.log(result)
        this.router.navigate(['/transactions'])
      },
      error: error => console.log(error)
    })
  }

  ngOnInit(){
    this.accountsService.getAll()
    .subscribe({
      next: (result) => {
        this.accounts.set(result)
      },
      error: (error) => console.log(error)
    })

    this.categoriesService.getAll()
    .subscribe({
      next: (result) => {
        this.categories.set(result.Categories)
      },
      error: (error) => console.log('error', error)
    })
  }
}
