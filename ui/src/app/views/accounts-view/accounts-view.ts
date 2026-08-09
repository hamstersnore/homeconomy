import { Component, inject, signal } from '@angular/core';
import { AccountsService } from '../../services/accounts/accounts-service';
import { Account } from '../../services/accounts/account.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-accounts-view',
  imports: [DatePipe, NgClass],
  templateUrl: './accounts-view.html',
  styleUrl: './accounts-view.css',
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
