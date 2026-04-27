import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../Services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = loginService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

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
  const role = login.getRoleFromToken();

  if (role !== 'Admin') {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const AdminsGuard: CanActivateFn = () => {
  const login = inject(LoginService);
  const router = inject(Router);
  const role = login.getRoleFromToken();

  if (role !== 'Admin' && role !== 'Admin2') {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const userGuard: CanActivateFn = () => {
  const login = inject(LoginService);
  const router = inject(Router);
  const role = login.getRoleFromToken();

  if (role !== 'user') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
