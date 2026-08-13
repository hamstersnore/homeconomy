import { DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TransactionService } from '../services/transactions/transaction.service';
import { TransactionDto } from '../services/transactions/transaction.model';

@Component({
  selector: 'app-get-transactions',
  imports: [DatePipe, RouterLink],
  templateUrl: './get-transactions.html',
  styleUrl: './get-transactions.css',
})
export class GetTransactions {

  private transactionsService = inject(TransactionService)

  transactions:WritableSignal<TransactionDto[]> = signal([])
  isDataLoaded=signal(false)

  ngOnInit(){
    this.transactionsService.getTransactions()
    .subscribe({
      next: (result) => {
        console.log('ok',result)
        this.isDataLoaded.set(true)
        this.transactions.set(result.Transactions)},
      error: (error) => console.log('error', error)
    })
  }

}
