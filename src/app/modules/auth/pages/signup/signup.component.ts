import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/authService/auth.service';
import { NotificationService } from '@core/services/notificationService/notification.service';
import { confirmPasswordValidator, passwordValidator } from '@shared/validators/password.validator';

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
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: confirmPasswordValidator,
      }
    );
  }

  getCtrl(name: string): FormControl {
    return this.signupForm.get(name) as FormControl;
  }

  onSubmit(): void {
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
      next: () => {
        this.isLoading = false;
        this.notificationService.success('Account created successfully!');
        this.router.navigate(['/articles']);
      },
      error: () => {
        this.isLoading = false;
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
