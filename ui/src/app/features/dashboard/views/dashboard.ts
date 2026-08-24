import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Balance, CategoryBalance } from '../models/dashboard.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  thisMonthName:string

  constructor() {
    this.thisMonthName = this.getMonthByDateId(new Date(Date.now()).getMonth())
  }

  getMonthByDateId(id:number):string {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[id]
  }

  private dashboardService = inject(DashboardService)
  balance = signal<Balance>(
    {
      Balance: 0,
      Expense: 0,
      Income: 0,
    })

  balanceThisMonth = signal<Balance>({
      Balance: 0,
      Expense: 0,
      Income: 0,
    })

  categoryBalance = signal<CategoryBalance[]>([])

  ngOnInit() {
    this.dashboardService.getDate()
      .subscribe({
        next: (result) => {
          this.balance.set(result.Balance)
          this.categoryBalance.set(result.CategoryBalanceThisMonth)
          this.balanceThisMonth.set(result.BalanceThisMonth)
        }
      })
  }


}
