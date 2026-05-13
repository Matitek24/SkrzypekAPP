import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private apiUrl = `${environment.apiUrl}/user/accounts`;

  constructor(private http: HttpClient){}

  getAccounts(): Observable<AccountResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const res = this.http.get<AccountResponse>(this.apiUrl, {headers});
    return res; 
  }
  createAccount(request: any): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}`, request);  
  }
  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateBalance(id: string, balance: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/balance`, { balance });
  }
}
