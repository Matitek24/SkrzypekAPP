import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Sidebar } from '../sidebar/sidebar'; 
import { Overview } from '../overview/overview';
import { Budget } from '../budget/budget'

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    CommonModule, 
    Sidebar,
    Overview,
    Budget
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  username: string | null = 'Użytkownik';
  currentSection: string = 'overview'; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  // Funkcja, która odbierze sygnał z Sidebaru (z Outputu)
  onSectionChange(section: string): void {
    this.currentSection = section;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}