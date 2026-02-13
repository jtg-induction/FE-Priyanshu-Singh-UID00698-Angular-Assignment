import { ApiResponse } from './api-response.model';

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export type ArticlesBulkResponse = ApiResponse<PaginatedResponse<Article>>;
export type ArticleDetailResponse = ApiResponse<Article>;
