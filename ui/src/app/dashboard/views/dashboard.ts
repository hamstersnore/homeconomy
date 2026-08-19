import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CategoryBalance } from '../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private dashboardService = inject(DashboardService)
  balance = signal(0.0)
  categoryBalance = signal<CategoryBalance[]>([])

  ngOnInit(){
    this.dashboardService.getDate()
      .subscribe({
        next: (result) => {
          this.balance.set(result.Balance)
          this.categoryBalance.set(result.CategoryBalance)
        }
      })
  }
}
