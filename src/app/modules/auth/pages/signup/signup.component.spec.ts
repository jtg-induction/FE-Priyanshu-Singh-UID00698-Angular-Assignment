import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    component.onSubmit();
    expect(component.signupForm.invalid).toBeTrue();
  });

  it('should call signup and navigate on valid submit', () => {
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
    authServiceSpy.signup.and.returnValue(of(mockResponse));

    component.signupForm.setValue({
      username: 'testuser',
      email: 'test@test.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
    });

    component.onSubmit();

    expect(authServiceSpy.signup).toHaveBeenCalled();
    expect(notificationServiceSpy.success).toHaveBeenCalledWith('Account created successfully!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should toggle password visibility', () => {
    const initial = component.hidePassword;
    component.togglePasswordVisibility('password');
    expect(component.hidePassword).toBe(!initial);
  });
});
