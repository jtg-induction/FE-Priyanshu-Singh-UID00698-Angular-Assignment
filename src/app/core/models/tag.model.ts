import { ApiResponse } from './api-response.model';

export interface Tags {
  id: string;
  name: string;
  createdAt: string;
}

export type TagsResponse = ApiResponse<Tags[]>;
