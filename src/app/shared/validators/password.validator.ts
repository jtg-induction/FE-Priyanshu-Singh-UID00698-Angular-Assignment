import { AbstractControl, ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR } from '@shared/constants/error.constants';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;
  if (!value) return null;

  const hasMinLength = value.length >= 8;
  const hasTwoNumbers = (value.match(/\d/g) || []).length >= 2;

  return hasMinLength && hasTwoNumbers ? null : { weakPassword: true };
}

export const confirmPasswordValidator = (group: AbstractControl): ValidationErrors | null => {
  const passwordCtrl = group.get('password');
  const confirmCtrl = group.get('confirmPassword');

  if (!passwordCtrl || !confirmCtrl) return null;

  if (!passwordCtrl.value || !confirmCtrl.value) return null;

  if (passwordCtrl.value !== confirmCtrl.value) {
    confirmCtrl.setErrors({
      ...(confirmCtrl.errors || {}),
      passwordMismatch: true,
    });
    return { passwordMismatch: true };
  }

  if (confirmCtrl.errors?.['passwordMismatch']) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordMismatch, ...rest } = confirmCtrl.errors;
    confirmCtrl.setErrors(Object.keys(rest).length ? rest : null);
  }

  return null;
};

export const getValidationErrorMessage = (control: AbstractControl | null): string => {
  if (!control || !control.errors) return '';
  const errorKey = Object.keys(control.errors)[0];
  const errorMessages = VALIDATION_ERROR[errorKey] || 'Invalid field';
  return errorMessages;
};
