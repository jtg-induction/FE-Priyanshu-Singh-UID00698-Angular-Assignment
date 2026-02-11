import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'DevAlgo | Articles' },
  { path: ':id', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
