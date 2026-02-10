import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

import { ArticlesBulkResponse } from '@core/models/article.model';
import { DashBoardFilter } from '@core/models/dashboard-filter.model';
import { TagsResponse } from '@core/models/tag.model';

@Injectable()
export class ArticleService {
  private readonly baseUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  getArticles(
    filters: DashBoardFilter,
    page: number,
    pageSize: number
  ): Observable<ArticlesBulkResponse> {
    const queryParams: Record<string, string | undefined> = {
      search: filters.search,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      tags: filters.tags ? filters.tags.join(',') : undefined,
    };

    let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });
    console.log(params);
    return this.http.get<ArticlesBulkResponse>(`${this.baseUrl}/articles`, { params });
  }

  getTags() {
    return this.http.get<TagsResponse>(`${this.baseUrl}/tags`);
  }
}
