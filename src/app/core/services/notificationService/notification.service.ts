import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  private show(message: string, type: 'success' | 'error', duration: number): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      ...this.defaultConfig,
      duration,
      data: { message, type },
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  success(message: string, duration = 2500): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 3500): void {
    this.show(message, 'error', duration);
  }
}
