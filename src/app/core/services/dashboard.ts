import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Website } from '../models/website.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/websites`;

  constructor(private http: HttpClient) {}

  getWebsites(): Observable<Website[]> {

    return of([
      { id: 1, name: 'Carex24', url: 'https://carex24.pl', status: 'ONLINE', lastChecked: new Date() },
      { id: 2, name: 'CrazyFotki', url: 'https://crazyfotki.pl', status: 'OFFLINE', lastChecked: new Date() },
      { id: 3, name: 'Salem Design', url: 'https://salemdesign.pl', status: 'ONLINE', lastChecked: new Date() }
    ]);
  }
}