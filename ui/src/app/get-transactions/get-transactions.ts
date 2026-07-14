import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

interface Transaction {
  id:number;
  amount:number;
  execution_date:Date;
}

@Component({
  selector: 'app-get-transactions',
  imports: [DatePipe, RouterLink],
  templateUrl: './get-transactions.html',
  styleUrl: './get-transactions.css',
})
export class GetTransactions {

  private httpClient = inject(HttpClient);

  transactions:WritableSignal<Transaction[]> = signal([])

  mockTransactions(){
    this.transactions.set([
                {
                  id: 1,
                  amount: 10.02,
                  execution_date: new Date(Date.now() - 5000)
                },
                          {
                  id: 2,
                  amount: 20.02,
                  execution_date: new Date(Date.now() - 10000)
                },
                          {
                  id: 3,
                  amount: 30.02,
                  execution_date: new Date(Date.now() - 15000)
                },
                          {
                  id: 4,
                  amount: 40.02,
                  execution_date: new Date(Date.now() - 100000)
                }
            ]);
  }

  ngOnInit(){
    this.httpClient.get<Transaction[]>('/api/transactions')
    .subscribe(
      {
        next: (data) => {
              this.transactions.set(data); },
        error: (error) => {      
              this.mockTransactions()
          }
      })
  }
}
