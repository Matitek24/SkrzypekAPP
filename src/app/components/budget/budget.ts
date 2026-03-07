import { Component } from '@angular/core';
import { AccountListComponent } from '../account-list/account-list'; 

@Component({
  selector: 'app-budget',
  standalone: true, // Dobra praktyka, by Budget też był standalone
  imports: [AccountListComponent], // Tutaj rejestrujemy dziecko
  templateUrl: './budget.html',
  styleUrl: './budget.css',
})
export class Budget { }