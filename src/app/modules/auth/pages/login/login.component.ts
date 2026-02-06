import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { getValidationErrorMessage } from '@shared/validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../signup/signup.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getErrorMessage(fieldName: string): string {
    return getValidationErrorMessage(this.loginForm.get(fieldName));
  }

  onSubmit(): void {
    this.loginForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (value) => {
        this.isLoading = false;
        console.log('Login successful', value);
        this.notificationService.success('Login successful!');
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
