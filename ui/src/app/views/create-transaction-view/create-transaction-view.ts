import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AccountsService } from '../../services/accounts/accounts-service';
import { Account } from '../../services/accounts/account.model';
import { Category } from '../../services/categories/category.model';
import { CategoriesService } from '../../services/categories/categories-service';

interface CreateTransactionData {
  amount: number;
  execution_date: Date;
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
  accounts = signal<Account[]>([])
  categories = signal<Category[]>([])

  createTransactionModel = signal<CreateTransactionData>({
    amount: 0.00,
    execution_date: new Date(Date.now())
  })

  createTransactionForm = form(this.createTransactionModel)

  onSubmit(event: Event){
    event.preventDefault();

    const createTransactionRequest = this.createTransactionModel();
    console.log('Transaction: ', createTransactionRequest)
    this.httpClient.post(environment.apiBaseUrl + 'transactions', JSON.stringify(createTransactionRequest))
      .subscribe((result) => 
        {
          this.router.navigate(['/transactions'])
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
