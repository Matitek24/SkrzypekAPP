import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AccountService } from '../../core/services/account';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  totalBalance: number = 0;
  username: string = 'Użytkownik';

  constructor(private accountService: AccountService) {}

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
  }
}
