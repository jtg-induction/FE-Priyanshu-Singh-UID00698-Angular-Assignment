import { FormControl } from '@angular/forms';
import { passwordValidator } from './password.validator';

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
});
