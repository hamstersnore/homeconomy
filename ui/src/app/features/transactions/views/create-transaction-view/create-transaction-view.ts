import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AccountsService } from '../../../accounts/services/accounts-service';
import { Account } from '../../../accounts/models/account.model';
import { TransactionService } from '../../services/transaction.service';
import { Category } from '../../../categories/models/category.model';
import { CategoryService } from '../../../categories/services/categories-service';

export interface CreateTransactionFormModel {
  AccountId:string
	Amount:number
  Type:string
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
  private router = inject(Router)
  private accountsService = inject(AccountsService)
  private categoriesService = inject(CategoryService)
  private transactionService = inject(TransactionService)
  accounts = signal<Account[]>([])
  categories = signal<Category[]>([])

  createTransactionModel = signal<CreateTransactionFormModel>({
    AccountId: '',
    Concept: '',
    Amount: 0.00,
    Type: 'expense',
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
      Type: this.createTransactionModel().Type,
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

  newCategory(){
    this.router.navigate(['/create-category'])
  }
}
