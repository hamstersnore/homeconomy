import { Component, inject, signal } from '@angular/core';
import { AccountsService } from '../../services/accounts-service';
import { Account } from '../../models/account.model';
import { HomeconomyButton } from "../../../../components/homeconomy-button";

@Component({
  selector: 'app-accounts-view',
  imports: [HomeconomyButton],
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
