import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { GlobalError } from './handlers/global-error.handler';
import { AuthInterceptor } from './interceptors/authInterceptor/auth.interceptor';
import { errorInterceptor } from './interceptors/errorInterceptor/error.interceptor';
import { loadingInterceptor } from './interceptors/loadingInterceptor/loading.interceptor';

import { ErrorComponent } from '../shared/components/error/error.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent, ErrorComponent],
  imports: [CommonModule, SharedModule],
  providers: [
    { provide: ErrorHandler, useClass: GlobalError },
    provideHttpClient(withInterceptors([loadingInterceptor, AuthInterceptor, errorInterceptor])),
  ],
})
export class CoreModule {}
