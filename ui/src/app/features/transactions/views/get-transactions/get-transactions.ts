import { DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TransactionService } from '../../services/transaction.service';
import { TransactionDto } from '../../models/transaction.model';
import { CategoryService } from '../../../categories/services/categories-service'
import { Category } from '../../../categories/models/category.model'
import { AccountsService as AccountService } from '../../../accounts/services/accounts-service';
import { Account } from '../../../accounts/models/account.model';

@Component({
  selector: 'app-get-transactions',
  imports: [DatePipe, RouterLink],
  templateUrl: './get-transactions.html',
})
export class GetTransactions {

  private transactionsService = inject(TransactionService)
  private categoryService = inject(CategoryService)
  private accountService = inject(AccountService)

  transactions:WritableSignal<TransactionDto[]> = signal([])
  categories = signal<Category[]>([])
  accounts = signal<Account[]>([])

  isDataLoaded=signal(false)

  ngOnInit(){
    this.categoryService.getAll()
      .subscribe({
        next: (result) => this.categories.set(result.Categories),
        error: error => console.log('Error', error)
      })

    this.accountService.getAll()
      .subscribe({
        next: (result) => this.accounts.set(result),
        error: error => console.log('Error', error)
      })

    this.transactionsService.getTransactions()
    .subscribe({
      next: (result) => {
        console.log('ok',result)
        if (result.Transactions !== null && result.Transactions.length > 0){
          result.Transactions.sort((a,b) => a.ExecutionDate > b.ExecutionDate ? 1 : -1).reverse()
          this.transactions.set(result.Transactions)
          this.isDataLoaded.set(true)
        }
      },
      error: (error) => console.log('error', error)
    })
  }

  categoryIdToName(id:number):string{
    return this.categories().filter(e => e.Id == id).at(0)?.Alias ?? 'unknown'
  }

  accountIdToName(id:number):string{
    return this.accounts().filter(e => e.id == id).at(0)?.alias ?? 'unknown'
  }

  deleteTransaction(id:number){
    let isConfirmed:boolean = confirm("Do you really want to delete the transaction ?")
    if (isConfirmed){
      this.transactionsService.deleteTransaction(id)
        .subscribe({
          next: (result) => this.transactions.set(this.transactions().filter(t => t.Id !== id))
        })
    }
  }

  getSymbol(tr:TransactionDto){
    if (tr.Type === "expense") {
      return '-'
    }
    return '+'
  }
}
