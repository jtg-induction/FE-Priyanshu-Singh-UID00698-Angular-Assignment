import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from '@modules/dashboard/services/article.service';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { HttpParams } from '@angular/common/http';

import { MatSidenav } from '@angular/material/sidenav';

import { Article } from '@core/models/article.model';
import { DashBoardFilter, sortByType, sortOrderType } from '@core/models/dashboard-filter.model';
import { NotificationService } from '@core/services/notificationService/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA];
  @ViewChild('filterDrawer') filterDrawer!: MatSidenav;

  articles: Article[] = [];
  selectedTags: string[] = [];

  sortBy: sortByType = 'createdAt';
  sortOrder: sortOrderType = 'DESC';
  currentSearch = '';

  length = 0;
  pageSize = 6;
  pageIndex = 0;

  pageEvent: PageEvent | undefined;

  private articleService = inject(ArticleService);
  private snackbar = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private search$ = new Subject<string>();

  ngOnInit(): void {
    this.search$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((search) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: search || '',
          page: 0,
          pageSize: 6,
        },
        queryParamsHandling: 'merge',
      });
    });

    this.route.queryParams.subscribe((params) => {
      const urlPage = +params['page'] || 1;
      this.pageIndex = Math.max(0, urlPage - 1);
      this.pageSize = +params['pageSize'] || 6;
      this.currentSearch = params['search'] || '';
      this.selectedTags = params['tags'] ? params['tags'].split(',') : [];
      this.sortBy = params['sortBy'] || 'createdAt';
      this.sortOrder = params['sortOrder'] || 'DESC';
      this.loadArticles();
    });
  }

  handlePageEvent(e: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: e.pageIndex + 1,
        pageSize: e.pageSize,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSearchChange(search: string): void {
    this.search$.next(search);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.selectedTags.includes(value)) this.selectedTags.push(value);
    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
  }

  applyFilters(filter: DashBoardFilter): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        tags: filter.tags?.length ? this.selectedTags.join(',') : undefined,
        sortBy: filter.sortBy,
        sortOrder: filter.sortOrder,
      },
      queryParamsHandling: 'merge',
    });
    this.filterDrawer.close();
  }

  clearFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: undefined,
        tags: undefined,
        sortBy: 'createdAt',
        sortOrder: 'DESC',
      },
      queryParamsHandling: 'merge',
    });
  }

  private buildParams(): HttpParams {
    let params = new HttpParams()
      .set('page', (this.pageIndex + 1).toString())
      .set('pageSize', this.pageSize.toString());

    if (this.currentSearch) {
      params = params.set('search', this.currentSearch);
    }

    if (this.selectedTags.length) {
      params = params.set('tags', this.selectedTags.join(','));
    }

    params = params.set('sortBy', this.sortBy).set('sortOrder', this.sortOrder);
    return params;
  }

  loadArticles(): void {
    const param = this.buildParams();

    this.articleService.getArticles(param).subscribe({
      next: (response) => {
        this.articles = response.data.data;
        this.pageSize = response.data.pageSize;
        this.length = response.data.totalItems;
      },
      error: () => {
        this.snackbar.error('Failed to fetch articles');
      },
    });
  }
}
