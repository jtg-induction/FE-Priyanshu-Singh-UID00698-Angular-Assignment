import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '@core/services/authService/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAccessToken()}`,
    },
  });
  return next(authRequest);
};
