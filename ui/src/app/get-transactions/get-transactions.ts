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

  mockTransactions(){
    this.transactions.set([
                {
                  Id: 1,
                  Amount: 10.02,
                  ExecutionDate: new Date(Date.now() - 5000)
                },
                          {
                  Id: 2,
                  Amount: 20.02,
                  ExecutionDate: new Date(Date.now() - 10000)
                },
                          {
                  Id: 3,
                  Amount: 30.02,
                  ExecutionDate: new Date(Date.now() - 15000)
                },
                          {
                  Id: 4,
                  Amount: 40.02,
                  ExecutionDate: new Date(Date.now() - 100000)
                }
            ]);
  }

  ngOnInit(){
    var trs = this.transactionsService.getTransactions()
    this.transactions.set(trs);
  }

}
