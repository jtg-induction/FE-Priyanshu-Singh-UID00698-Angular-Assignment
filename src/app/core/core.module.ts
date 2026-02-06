import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalError } from './handlers/global-error.handler';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: ErrorHandler, useClass: GlobalError },
    provideHttpClient(withInterceptors([AuthInterceptor, errorInterceptor])),
  ],
})
export class CoreModule {}
