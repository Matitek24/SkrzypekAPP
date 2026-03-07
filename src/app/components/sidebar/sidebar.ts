import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  isExpanded: boolean = false; 
  userInitial: string = 'U';
  username: string = 'Użytkownik'; // Dodajemy to!

  ngOnInit() {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.username = storedName;
      this.userInitial = storedName.charAt(0).toUpperCase();
    }
  }

  changeSection(section: string) {
    this.sectionChange.emit(section);
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}