import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs';

let activeRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  activeRequest++;
  spinner.show();
  return next(req).pipe(
    delay(2000),
    finalize(() => {
      activeRequest--;
      if (activeRequest == 0) spinner.hide();
    })
  );
};
