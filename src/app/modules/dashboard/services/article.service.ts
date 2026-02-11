import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

import { ArticleDetailResponse, ArticlesBulkResponse } from '@core/models/article.model';

@Injectable()
export class ArticleService {
  private readonly baseUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  getArticles(params: HttpParams): Observable<ArticlesBulkResponse> {
    return this.http.get<ArticlesBulkResponse>(`${this.baseUrl}/articles`, { params });
  }

  getArticleDetails(id: string): Observable<ArticleDetailResponse> {
    return this.http.get<ArticleDetailResponse>(`${this.baseUrl}/articles/${id}`);
  }
}
