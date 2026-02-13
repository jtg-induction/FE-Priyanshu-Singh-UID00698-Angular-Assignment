import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  pure: true,
})
export class ValidationErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    const firstErrorKey = Object.keys(errors)[0];
    const errorMessages: Record<string, string> = {
      required: 'This Field is required',
      email: 'Please enter a valid email',
      weakPassword: 'Min 8 chars, 2+ numbers, 2+ symbols.',
      passwordMismatch: 'Passwords do not match',
    };

    if (firstErrorKey === 'minlength') {
      const { requiredLength } = errors['minlength'];
      return `Minimum ${requiredLength} characters required`;
    }
    if (firstErrorKey === 'maxlength') {
      const { requiredLength } = errors['maxlength'];
      return `Maximum ${requiredLength} characters allowed`;
    }

    const message = errorMessages[firstErrorKey];
    return message;
  }
}
