import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

interface CreateTransactionData {
  amount: number;
  execution_date: Date;
}

@Component({
  selector: 'app-create-transaction',
  imports: [FormField],
  templateUrl: './create-transaction.html',
  styleUrl: './create-transaction.css',
})
export class CreateTransaction {
  private httpClient = inject(HttpClient);
  private router = inject(Router)

  createTransactionModel = signal<CreateTransactionData>({
    amount: 0.00,
    execution_date: new Date(Date.now())
  })

  createTransactionForm = form(this.createTransactionModel)

  onSubmit(event: Event){
    event.preventDefault();

    const createTransactionRequest = this.createTransactionModel();
    console.log('Transaction: ', createTransactionRequest)
    this.httpClient.post('/api/transactions', JSON.stringify(createTransactionRequest))
      .subscribe((result) => 
        {
          this.router.navigate(['/transactions'])
        })
  }
}
