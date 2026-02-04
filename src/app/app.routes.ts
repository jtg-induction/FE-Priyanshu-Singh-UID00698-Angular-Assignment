import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/404-page/not-found/not-found.component';

export const routes: Routes = [{ path: '**', component: NotFoundComponent }];
