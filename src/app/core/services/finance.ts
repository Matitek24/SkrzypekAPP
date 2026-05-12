import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FinanceDashboardResponse, MonthlyStatDto } from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private readonly apiUrl = `${environment.apiUrl}/admin/finances`;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<FinanceDashboardResponse> {
    return this.http.get<FinanceDashboardResponse>(`${this.apiUrl}/dashboard`);
  }

  getMonthlyStats(year: number): Observable<MonthlyStatDto[]> {
    return this.http.get<MonthlyStatDto[]>(`${this.apiUrl}/stats?year=${year}`);
  }
}