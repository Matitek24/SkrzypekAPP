import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account';
import { FinanceService } from '../../core/services/finance';
import { Account } from '../../core/models/account.model.js';
import { FinanceDashboardResponse, MonthlyStatDto } from '../../core/models/finance.model';
import { CurrencyPipe, CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FinanceChartComponent } from '../finance-chart/finance-chart';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, DatePipe, DecimalPipe, FinanceChartComponent, ReactiveFormsModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css'
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  total: number = 0;

  accountForm = new FormGroup({
    name: new FormControl('', Validators.required),
    initialBalance: new FormControl(0, [Validators.required, Validators.min(0)]),
    icon: new FormControl('bi-bank', Validators.required),
    groupType: new FormControl('BANK', Validators.required)
  });

  dashboardData?: FinanceDashboardResponse;
  monthlyStats: MonthlyStatDto[] = [];

  isTransactionModalOpen = false;
  isAccountModalOpen = false;
  todayDate = new Date().toISOString().split('T')[0];

  transactionForm = new FormGroup({
    type: new FormControl('EXPENSE', Validators.required),
    accountId: new FormControl('', Validators.required), 
    amount: new FormControl(null, [Validators.required, Validators.min(0.01)]), 
    category: new FormControl('Jedzenie', Validators.required),
    description: new FormControl(''), 
    transactionDate: new FormControl(this.todayDate, Validators.required)
  });

  constructor(
    private accountService: AccountService,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    // Konta
    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res.accounts;
        this.total = res.totalBalance;
      },
      error: (err) => console.error('Błąd kont!', err)
    });

    // Dashboard stats
    this.financeService.getDashboardData().subscribe({
      next: (res) => {
        this.dashboardData = res;
      },
      error: (err) => console.error('Błąd dashboardu!', err)
    });

    // Statystyki miesięczne
    const currentYear = new Date().getFullYear();
    this.financeService.getMonthlyStats(currentYear).subscribe({
      next: (res) => {
        this.monthlyStats = res;
      },
      error: (err) => console.error('Błąd statystyk!', err)
    });
  }

  // Helper: ikona kategorii transakcji
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
      'Dom': 'bi bi-house-heart',
      'Wynagrodzenie': 'bi bi-cash-stack',
    };
    return map[category] || 'bi bi-tag';
  }

  // Helper: kolor tła ikony
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
      'Dom': '#14b8a6',
      'Wynagrodzenie': '#10b981',
    };
    return map[category] || '#94a3b8';
  }

  // Modal actions
  openAddTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeAddTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  openAddAccountModal() {
    this.isAccountModalOpen = true;
  }

  closeAddAccountModal() {
    this.isAccountModalOpen = false;
  }

  submitAccount(){
    if(this.accountForm.valid){
      const formValues = this.accountForm.value;

      this.accountService.createAccount(formValues).subscribe({
        next: (res) => {
         this.closeAddAccountModal();
         this.accountForm.reset({ icon: 'bi-bank', groupType: 'BANK', initialBalance: 0 });
        },
        error: (err) => console.error('Błąd tworzenia konta!', err)
      })
    }
  }

  submitTransaction() {
    if (this.transactionForm.valid) {
      const formValues = this.transactionForm.value;

      this.financeService.addTransaction(formValues).subscribe({
        next: () => {
          console.log('Transakcja pomyślnie dodana!');
          this.closeAddTransactionModal();
          
          this.transactionForm.reset({
            type: 'EXPENSE',
            accountId: '',
            amount: null,
            category: 'Jedzenie',
            description: '',
            transactionDate: this.todayDate
          });
          this.ngOnInit(); 
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania transakcji:', err);
        }
      });
    }
  }

}