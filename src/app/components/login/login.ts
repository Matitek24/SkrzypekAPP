import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { AuthService } from '../../core/services/auth.js';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;
  
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log('Szczegóły błędu:', err); // Sprawdź co dokładnie tu siedzi
        
        // Jeśli status to 401, to na 100% złe hasło/login
        if (err.status === 401) {
          this.errorMessage = 'Nieprawidłowy login lub hasło.';
        } else {
          this.errorMessage = 'Coś poszło nie tak. Spróbuj ponownie później.';
        }
      }
    });
  }

  ngOnInit() {
    // Jak tylko wejdziesz na stronę logowania, czyścimy wszystko
    this.authService.logout(); 
    // Dodatkowo usuwamy śmieci z localStorage na wszelki wypadek
    localStorage.clear();
  }
}