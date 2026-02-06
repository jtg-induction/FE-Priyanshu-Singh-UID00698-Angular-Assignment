import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];
