import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

export const loginPageGuard: CanActivateFn = () => {
  const auth = inject(LoginService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = () => {
  const login = inject(LoginService);
  const router = inject(Router);
  const user = login.getUser();

  if (!user || user.status !== 'Admin') {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const userGuard: CanActivateFn = () => {
  const login = inject(LoginService);
  const router = inject(Router);
  const user = login.getUser();

  if (!user || user.status !== 'user') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
