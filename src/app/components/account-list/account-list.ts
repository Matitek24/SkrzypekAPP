import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account';
import { Account } from '../../core/models/account.model.js';
import { CurrencyPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css'
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  total: number = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // Odpalamy zapytanie przy starcie komponentu
    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.accounts = res.accounts;
        this.total = res.totalBalance;
      },
      error: (err) => console.error('Błąd!', err)
    });
  }
}