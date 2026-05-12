import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { AccountService } from '../../core/services/account';
import { FinanceService } from '../../core/services/finance';
import { FinanceDashboardResponse } from '../../core/models/finance.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  totalBalance: number = 0;
  username: string = 'Użytkownik';
  dashboardData?: FinanceDashboardResponse;

  constructor(
    private accountService: AccountService,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.username = storedName;
    }

    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.totalBalance = res.totalBalance;
      },
      error: (err) => console.error('Blad pobierania danych', err)
    });

    this.financeService.getDashboardData().subscribe({
      next: (res) => {
        this.dashboardData = res;
      },
      error: (err) => console.error('Blad dashboardu', err)
    });
  }

  // Helper: ikona kategorii
  getCategoryIcon(category: string): string {
    const map: Record<string, string> = {
      'IT': 'bi bi-cpu',
      'Rozrywka': 'bi bi-controller',
      'Abonamenty': 'bi bi-credit-card-2-front',
      'Transport': 'bi bi-car-front',
      'Zlecenia': 'bi bi-briefcase',
      'Jedzenie': 'bi bi-cup-hot',
      'Zdrowie': 'bi bi-heart-pulse',
      'Edukacja': 'bi bi-book',
    };
    return map[category] || 'bi bi-tag';
  }

  getCategoryColor(category: string): string {
    const map: Record<string, string> = {
      'IT': '#8b5cf6',
      'Rozrywka': '#f59e0b',
      'Abonamenty': '#06b6d4',
      'Transport': '#6366f1',
      'Zlecenia': '#22c55e',
      'Jedzenie': '#ef4444',
      'Zdrowie': '#ec4899',
      'Edukacja': '#3b82f6',
    };
    return map[category] || '#94a3b8';
  }
}
