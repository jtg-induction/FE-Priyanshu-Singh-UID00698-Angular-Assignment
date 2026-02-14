import { CdkVirtualScrollableElement } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ArticleCardComponent } from './components/article/article-card/article-card.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { ButtonComponent } from './components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ValidationErrorPipe } from './pipe/validation-error.pipe';

@NgModule({
  declarations: [
    AuthCardComponent,
    InputFieldComponent,
    ButtonComponent,
    ValidationErrorPipe,
    ArticleCardComponent,
    SearchBarComponent,
    NavbarComponent,
    SnackbarComponent,
  ],

  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CdkVirtualScrollableElement,
    MatCardModule,
    MatToolbarModule,
  ],
  exports: [
    ButtonComponent,
    AuthCardComponent,
    RouterModule,
    InputFieldComponent,
    ValidationErrorPipe,
    AuthCardComponent,
    InputFieldComponent,
    ButtonComponent,
    ValidationErrorPipe,
    ArticleCardComponent,
    SearchBarComponent,
    NavbarComponent,
    SnackbarComponent,
  ],
})
export class SharedModule {}
