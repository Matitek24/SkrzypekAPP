import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Overview } from '../overview/overview';
import { Budget } from '../budget/budget';
import { PlaceholderSection } from '../placeholder-section/placeholder-section';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar,
    Overview,
    Budget,
    PlaceholderSection
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  username: string | null = 'Uzytkownik';
  currentSection: string = 'overview';

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
}