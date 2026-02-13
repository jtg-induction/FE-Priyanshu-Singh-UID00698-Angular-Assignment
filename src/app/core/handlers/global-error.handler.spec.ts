import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NotificationService } from '@core/services/notificationService/notification.service';

import { GlobalError } from './global-error.handler';

describe('GlobalError', () => {
  let errorHandler: GlobalError;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        GlobalError,
        { provide: ErrorHandler, useExisting: GlobalError },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ],
    });

    errorHandler = TestBed.inject(GlobalError);
  });

  it('should be created', () => {
    expect(errorHandler).toBeTruthy();
  });

  it('should show notification for non-HTTP errors', () => {
    const error = new Error('Boom');

    errorHandler.handleError(error);

    expect(notificationServiceSpy.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should NOT show notification for HttpErrorResponse', () => {
    const httpError = new HttpErrorResponse({ status: 500 });

    errorHandler.handleError(httpError);

    expect(notificationServiceSpy.error).not.toHaveBeenCalled();
  });
});
