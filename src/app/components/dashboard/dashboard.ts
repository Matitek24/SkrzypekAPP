import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

// Moduły PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, AvatarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  username: string | null = 'Użytkownik';
  currentSection: string = 'overview'; // Domyślny widok

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}