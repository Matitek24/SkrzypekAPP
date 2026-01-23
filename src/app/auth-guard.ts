import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  console.log('--- GUARD CHECK ---');
  console.log('Token w pamięci:', token);

  if (token) {
    return true;
  } else {
    console.warn('Guard zablokował dostęp - brak tokena!');
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};