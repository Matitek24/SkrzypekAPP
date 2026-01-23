import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import { AuthService } from '../../core/services/auth.js';
import { OnInit } from '@angular/core';
import { LoginRequest, AuthResponse } from '../../core/models/auth.models.model.js';
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
    const credentials: LoginRequest = { 
      username: this.username, 
      password: this.password 
    };

    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;
  
    this.authService.login(credentials).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        localStorage.setItem('username', res.username); 
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
    
        if (err.status === 401) {
          this.errorMessage = 'Nieprawidłowy login lub hasło.';
        } else {
          this.errorMessage = 'Coś poszło nie tak. Spróbuj ponownie później.';
        }
      }
    });
  }

  ngOnInit() {
    this.authService.logout(); 
    localStorage.clear();
  }
}