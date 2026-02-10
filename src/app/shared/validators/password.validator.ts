import { AbstractControl, ValidationErrors } from '@angular/forms';

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

  // console.log(passwordCtrl, confirmCtrl);

  if (!passwordCtrl || !confirmCtrl) return null;

  if (!passwordCtrl.value || !confirmCtrl.value) return null;

  console.log(confirmCtrl);
  if (passwordCtrl.value !== confirmCtrl.value) {
    confirmCtrl.setErrors({ ...(confirmCtrl.errors || {}), passwordMismatch: true });
    return { passwordMismatch: true };
  }

  return null;
};
