import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from '@modules/auth/auth-layout/auth-layout.component';

import { DashboardLayoutComponent } from '@modules/dashboard/dashboard-layout/dashboard-layout.component';

import { authGuard } from '@core/guards/authGuard/auth.guard';
import { guestGuard } from '@core/guards/guestGuard/guest.guard';

import { ErrorComponent } from '@shared/components/error/error.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'articles',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: 'error', component: ErrorComponent, title: 'DevAlgo | Error' },
  { path: '**', component: NotFoundComponent, title: 'DevAlgo | Not Found' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
