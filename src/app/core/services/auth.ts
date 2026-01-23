import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('username', response.username);
      })
    );
  }
  logout() {
    // Wołamy backend, żeby usunął ciasteczko
    this.http.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.clear();
          console.log('Sesja wyczyszczona na backendzie i frontendzie');
        },
        error: () => localStorage.clear() 
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}