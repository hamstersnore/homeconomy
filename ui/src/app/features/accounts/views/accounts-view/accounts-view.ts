import { Component, inject, signal } from '@angular/core';
import { AccountsService } from '../../services/accounts-service';
import { Account } from '../../models/account.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-accounts-view',
  imports: [DatePipe, RouterLink],
  templateUrl: './accounts-view.html',
})
export class AccountsView {
  accountsService = inject(AccountsService)
  accounts = signal<Account[]>([])

  ngOnInit(){
    this.accountsService.getAll()
    .subscribe({
      next: (result) => {
        console.log(result)
        this.accounts.set(result)
      },
      error: (error) => console.log('error', error)
    })
  }
}
