import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;
  private spinner = inject(NgxSpinnerService);

  show() {
    if (this.requestCount === 0) this.spinner.show();
    this.requestCount++;
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.spinner.hide();
      this.requestCount = 0;
    }
  }
}
