import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthResponse } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    component.onSubmit();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call login on valid submit', () => {
    const mockResponse: AuthResponse = {
      success: true,
      message: 'ok',
      data: {
        user: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'fake-token',
      },
      timestamp: new Date().toISOString(),
    };

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({
      username: 'testuser',
      password: 'StrongPass@1234',
    });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(notificationServiceSpy.success).toHaveBeenCalledWith('Login successful!');
  });

  it('should toggle password visibility', () => {
    const initial = component.hidePassword;
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBe(!initial);
  });
});
