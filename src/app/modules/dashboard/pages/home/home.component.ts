import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from '@modules/dashboard/services/article.service';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { Article } from '@core/models/article.model';
import { DashBoardFilter, sortByType, sortOrderType } from '@core/models/dashboard-filter.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA];

  articles: Article[] = [];
  selectedTags: string[] = [];
  isArticleLoading = false;
  isTagsLoading = false;
  sortBy: sortByType = 'createdAt';
  sortOrder: sortOrderType = 'DESC';
  currentSearch = '';

  length = 0;
  pageSize = 6;
  pageIndex = 0;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.loadArticles();
  }

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
        },
      });
    });

    this.route.queryParams.subscribe((params) => {
      console.log('URL PARAMS', params);
      this.pageIndex = +params['page'] || 0;
      this.pageSize = +params['pageSize'] || 6;
      this.currentSearch = params['search'] || '';
      this.selectedTags = params['tags'] ? params['tags'].split(',') : [];
      this.sortBy = params['sortBy'] || 'createdAt';
      this.sortOrder = params['sortOrder'] || 'DESC';
      this.loadArticles();
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

  //  this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       page: this.pageIndex + 1,
  //       pageSize: this.pageSize,
  //       search: filters.search,
  //       // tags: filters.tags,
  //       sortBy: this.sortBy,
  //       sortOrder: this.sortOrder,
  //     },
  //   });

  loadArticles(): void {
    this.isArticleLoading = true;
    const filters: DashBoardFilter = {
      search: this.currentSearch || undefined,
      tags: this.selectedTags.length ? this.selectedTags : undefined,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    };

    this.articleService.getArticles(filters, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.articles = response.data.data;
        this.pageSize = response.data.pageSize;
        this.length = response.data.totalItems;
        this.isArticleLoading = false;
        this.snackbar.success('Articles fetched successfully');
      },
      error: (err) => {
        console.log(err);
        this.isArticleLoading = false;
        this.snackbar.error('Failed to fetch articles');
      },
    });
  }
}
