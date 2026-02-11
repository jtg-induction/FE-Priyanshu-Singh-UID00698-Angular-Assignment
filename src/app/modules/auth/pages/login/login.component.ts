import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginRequest } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

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
      password: ['', [Validators.required]],
    });
  }

  getCtrl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.loginForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(payload).subscribe({
      next: (value) => {
        this.isLoading = false;
        console.log('Login successful', value);
        this.notificationService.success('Login successful!');
        this.router.navigate(['/articles']);
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
