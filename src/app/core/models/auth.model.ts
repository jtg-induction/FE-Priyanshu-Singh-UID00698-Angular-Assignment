import { ApiResponse } from './api-response.model';
import { User } from './user.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export type AuthResponse = ApiResponse<AuthData>;
