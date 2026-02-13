import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;
  private spinner = inject(NgxSpinnerService);

  show() {
    this.requestCount++;
    this.spinner.show();
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.spinner.hide();
      this.requestCount = 0;
    }
  }
}
