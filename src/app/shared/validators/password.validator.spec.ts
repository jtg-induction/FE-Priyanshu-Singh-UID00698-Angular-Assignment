import { FormControl, FormGroup } from '@angular/forms';

import { confirmPasswordValidator, passwordValidator } from './password.validator';

describe('passwordValidator', () => {
  it('should return error when password is weak (missing special chars)', () => {
    const control = new FormControl('Ab123456');
    const result = passwordValidator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return error when password is weak (too short)', () => {
    const control = new FormControl('Ab@1@2');
    const result = passwordValidator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return null when password is strong (8+ chars, 2+ numbers, 2+ symbols)', () => {
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

  it('should return null when passwords match', () => {
    const form = new FormGroup({
      password: new FormControl('Ab@12@34'),
      confirmPassword: new FormControl('Ab@12@34'),
    });

    const result = confirmPasswordValidator(form);

    expect(result).toBeNull();
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
