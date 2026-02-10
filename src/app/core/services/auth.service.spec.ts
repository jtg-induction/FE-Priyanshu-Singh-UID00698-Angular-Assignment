import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment.development';

import { AuthResponse, LoginRequest, SignUpRequest } from '@core/models/auth.model';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { ACCESS_TOKEN_KEY, USER_KEY } from '@shared/constants/general.constants';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const API_URL = environment.apiBaseUrl;

  const mockUser: User = {
    id: '1',
    username: 'Test User',
    email: 'test@test.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockResponse: AuthResponse = {
    success: true,
    message: 'ok',
    data: {
      user: mockUser,
      token: 'mock-token',
    },
    timestamp: new Date().toISOString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should login and store user + token', () => {
    const credentials: LoginRequest = {
      username: 'test@test.com',
      password: '123456',
    };

    service.login(credentials).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getCurrentUser()).toEqual(mockUser);
      expect(service.getAccessToken()).toBe('mock-token');
    });

    const req = httpMock.expectOne(`${API_URL}/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush(mockResponse);
  });

  it('should signup and set session', () => {
    const credentials: SignUpRequest = {
      email: 'test@test.com',
      username: 'Test User',
      password: '123456',
    };
    service.signup(credentials).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getCurrentUser()).toEqual(mockUser);
      expect(service.getAccessToken()).toBe('mock-token');
    });

    const req = httpMock.expectOne(`${API_URL}/users/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush(mockResponse);
  });

  it('should logout and clear auth state', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'token');
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    service.logout();

    expect(service.getAccessToken()).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should reset auth state if stored user is invalid JSON', () => {
    localStorage.setItem(ACCESS_TOKEN_KEY, 'token');
    localStorage.setItem(USER_KEY, '{invalid-json');

    const restoredService = TestBed.inject(AuthService);

    expect(restoredService.isAuthenticated()).toBeFalse();
    expect(restoredService.getCurrentUser()).toBeNull();
  });
});
