import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: MatSnackBar, useValue: snackBarSpy }],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success snackbar', () => {
    service.success('Success message');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Success message',
      'Close',
      jasmine.objectContaining({
        duration: 2500,
        panelClass: ['snackbar-success'],
      })
    );
  });

  it('should show error snackbar', () => {
    service.error('Error message');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Error message',
      'Close',
      jasmine.objectContaining({
        duration: 3500,
        panelClass: ['snackbar-error'],
      })
    );
  });
});
