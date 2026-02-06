import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  private snackBar = inject(MatSnackBar);

  private show(message: string, panelClass: string, duration: number): void {
    this.snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      duration,
      panelClass: [panelClass],
    });
  }

  success(message: string, duration = 2500): void {
    this.show(message, 'snackbar-success', duration);
  }

  error(message: string, duration = 3500): void {
    this.show(message, 'snackbar-error', duration);
  }
}
