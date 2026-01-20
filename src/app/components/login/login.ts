import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
username: string = '';
password: string = '';

constructor(private router: Router) {}

ngOnInit() {
  console.log('Czyszczenie sesji...');
  localStorage.removeItem('isLoggedIn'); 
  // Albo localStorage.clear(); jeśli chcesz wywalić wszystko
}
onLogin(event: Event){
  event.preventDefault();

  if(this.username === 'admin' && this.password === 'password'){
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/dashboard']);
  } else {
    alert('Invalid credentials');
  }
}
}
