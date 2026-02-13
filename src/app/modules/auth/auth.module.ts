import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '@shared/shared.module';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatIcon,
    MatProgressSpinnerModule,
  ],
})
export class AuthModule {}
