import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('admin_auth') === 'true') {
    return true;
  }

  return router.createUrlTree(['/login']);
};
