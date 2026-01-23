import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { AuthService } from '../../core/services/auth.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
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
        if (err.status === 401) {
          this.errorMessage = 'Nieprawidłowy login lub hasło.';
        } else {
          this.errorMessage = 'Błąd serwera. Spróbuj ponownie później.';
        }
      }
    });
  }

  ngOnInit() {
    this.authService.logout();
}
}