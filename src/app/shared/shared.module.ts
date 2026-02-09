import { CdkVirtualScrollableElement } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { ButtonComponent } from './components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ValidationErrorPipe } from './pipe/validation-error.pipe';

@NgModule({
  declarations: [AuthCardComponent, InputFieldComponent, ButtonComponent, ValidationErrorPipe],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInput,
    MatButtonModule,
    MatProgressSpinnerModule,
    CdkVirtualScrollableElement,
  ],
  exports: [
    ButtonComponent,
    AuthCardComponent,
    RouterModule,
    InputFieldComponent,
    ValidationErrorPipe,
  ],
})
export class SharedModule {}
