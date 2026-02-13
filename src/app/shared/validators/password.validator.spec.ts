import { FormControl, FormGroup } from '@angular/forms';
import { VALIDATION_ERROR } from '@shared/constants/error.constants';
import {
  confirmPasswordValidator,
  getValidationErrorMessage,
  passwordValidator,
} from './password.validator';

describe('passwordValidator', () => {
  it('should return error when password is weak', () => {
    const control = new FormControl('abc123');
    const result = passwordValidator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return null when password is strong', () => {
    const control = new FormControl('Ab@12@34');
    const result = passwordValidator(control);
    expect(result).toBeNull();
  });

  it('should return null when value is empty', () => {
    const control = new FormControl('');
    const result = passwordValidator(control);
    expect(result).toBeNull();
  });
});

describe('confirmPasswordValidator', () => {
  it('should set passwordMismatch error when passwords do not match', () => {
    const form = new FormGroup({
      password: new FormControl('Ab@12@34'),
      confirmPassword: new FormControl('Ab@12@35'),
    });

    const result = confirmPasswordValidator(form);

    expect(result).toEqual({ passwordMismatch: true });
    expect(form.get('confirmPassword')?.errors).toEqual({
      passwordMismatch: true,
    });
  });

  it('should clear passwordMismatch error when passwords match', () => {
    const form = new FormGroup({
      password: new FormControl('Ab@12@34'),
      confirmPassword: new FormControl('Ab@12@34'),
    });

    form.get('confirmPassword')?.setErrors({ passwordMismatch: true });

    const result = confirmPasswordValidator(form);

    expect(result).toBeNull();
    expect(form.get('confirmPassword')?.errors).toBeNull();
  });

  it('should return null if controls are missing', () => {
    const form = new FormGroup({});
    const result = confirmPasswordValidator(form);
    expect(result).toBeNull();
  });

  it('should return null if values are empty', () => {
    const form = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });

    const result = confirmPasswordValidator(form);
    expect(result).toBeNull();
  });
});

describe('getValidationErrorMessage', () => {
  it('should return empty string when control is null', () => {
    expect(getValidationErrorMessage(null)).toBe('');
  });

  it('should return empty string when control has no errors', () => {
    const control = new FormControl('test');
    expect(getValidationErrorMessage(control)).toBe('');
  });

  it('should return mapped validation error message', () => {
    const control = new FormControl('');
    control.setErrors({ weakPassword: true });

    expect(getValidationErrorMessage(control)).toBe(VALIDATION_ERROR['weakPassword']);
  });

  it('should return default message for unknown error', () => {
    const control = new FormControl('');
    control.setErrors({ unknownError: true });

    expect(getValidationErrorMessage(control)).toBe('Invalid field');
  });
});
