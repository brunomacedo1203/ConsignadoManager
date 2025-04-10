import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.currentUserValue;

  if (currentUser && currentUser.token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
