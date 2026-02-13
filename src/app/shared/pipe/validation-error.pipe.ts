import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  pure: true,
})
export class ValidationErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    const errorMessages: Record<string, string> = {
      required: 'This Field is required',
      email: 'Please enter a valid email',
      weakPassword: 'Password must be at least 8 characters and contain at least 2 numbers',
      passwordMismatch: 'Passwords do not match',
    };

    const firstErrorKey = Object.keys(errors)[0];

    const message = errorMessages[firstErrorKey];
    return message;
  }
}
