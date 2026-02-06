export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  error: string | string[];
  code: string;
  timestamp: string;
}
