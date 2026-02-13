import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';

import { NotificationService } from '@core/services/notification.service';
import { ERROR_MESSAGES } from '@shared/constants/error.constants';
@Injectable()
export class GlobalError implements ErrorHandler {
  private notificationService = inject(NotificationService);
  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) return;
    this.notificationService.error(ERROR_MESSAGES.GENERIC_ERROR);
    console.error(error);
  }
}
