import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from '@core/services/notification.service';
@Injectable()
export class GlobalError implements ErrorHandler {
  private notificationService = inject(NotificationService);
  handleError(error: unknown): void {
    this.notificationService.error('Something went wrong');
    console.error('A global error occurred:', error);
  }
}
