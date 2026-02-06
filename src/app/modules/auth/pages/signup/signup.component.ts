import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import {
  confirmPasswordValidator,
  getValidationErrorMessage,
  passwordValidator,
} from '@shared/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  signupForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor() {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: confirmPasswordValidator,
      }
    );
  }

  getErrorMessage(fieldName: string): string {
    return getValidationErrorMessage(this.signupForm.get(fieldName));
  }

  onSubmit(): void {
    this.signupForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload: SignUpRequest = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.authService.signup(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Signup successful:', response);
        this.notificationService.success('Account created successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Signup failed:', error);
      },
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
}
