import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, SignUpRequest } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/v1';
  private readonly USER_KEY = 'auth_data';
  private readonly ACCESS_TOKEN_KEY = 'access_token';

  private readonly userSubject = new BehaviorSubject<User | null>(null);

  public user$ = this.userSubject.asObservable();

  private http = inject(HttpClient);

  constructor() {
    this.restoreAuthState();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/users/login`, credentials).pipe(
      tap(({ data }) => {
        this.setSession(data.user, data.token);
      })
    );
  }

  signup(userData: SignUpRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/users/register`, userData)
      .pipe(tap(({ data }) => this.setSession(data.user, data.token)));
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  private setSession(user: User, token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private restoreAuthState(): void {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const storedUser = localStorage.getItem(this.USER_KEY);

    if (!token || !storedUser) return;
    try {
      const user: User = JSON.parse(storedUser);
      this.userSubject.next(user);
    } catch {
      this.logout();
    }
  }
}
