import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp < Date.now() / 1000;

    if (!isExpired) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};