import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { ApiError } from '@core/models/api-response.model';
import { NotificationService } from '@core/services/notificationService/notification.service';
import { ERROR_MESSAGES, SERVER_ERROR_CODES } from '@shared/constants/error.constants';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiError;

      let message = ERROR_MESSAGES.GENERIC_ERROR;
      if (apiError?.code) {
        message = SERVER_ERROR_CODES[apiError.code] ?? apiError.message ?? message;
      }

      if (error.status === 401) {
        const currentUrl = router.url;
        notificationService.error(message);

        if (!currentUrl.includes('/login')) {
          router.navigate(['/login']);
        }
      }
      notificationService.error(message);
      return throwError(() => error);
    })
  );
};
