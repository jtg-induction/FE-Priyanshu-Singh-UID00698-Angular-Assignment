import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidators(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  if (!value) return null;
  const hasMinLength = value.length >= 8;
  const minTwoNumbers = /(?=(?:.*?\d){2,})/;
  const passwordValid = hasMinLength && minTwoNumbers;
  return passwordValid ? null : { weakpassword: true };
}
