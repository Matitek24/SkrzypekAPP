import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  @Input() activeSection: string = 'overview';
  @Output() sectionChange = new EventEmitter<string>();

  isExpanded: boolean = true;
  userInitial: string = 'U';
  username: string = 'Uzytkownik';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isExpanded = window.innerWidth >= 768;

    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.username = storedName;
      this.userInitial = storedName.charAt(0).toUpperCase();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      this.isExpanded = false;
    }
  }

  changeSection(section: string) {
    this.sectionChange.emit(section);
    if (window.innerWidth < 768) {
      this.isExpanded = false;
    }
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}