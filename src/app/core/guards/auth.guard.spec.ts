import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '@core/services/authService/auth.service';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('should allow navigation if authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    expect(result).toBeTrue();
  });

  it('should return UrlTree to /login if not authenticated', () => {
    const mockUrlTree = {} as UrlTree;
    authService.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBe(mockUrlTree);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
});
