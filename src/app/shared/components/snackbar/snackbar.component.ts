import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { SnackBarData } from '@core/models/snackbardata.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  public snackbarRef = inject(MatSnackBarRef<SnackbarComponent>);

  public data = inject<SnackBarData>(MAT_SNACK_BAR_DATA);

  close(): void {
    this.snackbarRef.dismiss();
  }
}
