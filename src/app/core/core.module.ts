import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { GlobalError } from './handlers/global-error.handler';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule],
  providers: [
    { provide: ErrorHandler, useClass: GlobalError },
    provideHttpClient(withInterceptors([AuthInterceptor, errorInterceptor])),
  ],
  exports: [NotFoundComponent],
})
export class CoreModule {}
