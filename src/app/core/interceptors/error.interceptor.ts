import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '@core/models/api-response.model';
import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/error.constants';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiError;
      let message = 'Something went wrong. Please try again';
      if (apiError?.code) {
        message = ERROR_MESSAGES[apiError.code] ?? apiError.message ?? message;
      }

      if (error.status === 401) {
        const currentUrl = router.url;
        notificationService.error(message);

        if (!currentUrl.includes('/login')) {
          //will add
        }
      }
      notificationService.error(message);
      return throwError(() => error);
    })
  );
};
