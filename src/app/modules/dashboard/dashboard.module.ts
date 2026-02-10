import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '@shared/shared.module';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ArticleService } from './services/article.service';
import { FilterDrawerComponent } from './components/filter-drawer/filter-drawer.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    FilterDrawerComponent,
    ArticleListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    MatLabel,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [ArticleService],
})
export class DashboardModule {}
