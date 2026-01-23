import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Sprawdzamy tylko "pomocniczą" flagę
  if (localStorage.getItem('username')) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};