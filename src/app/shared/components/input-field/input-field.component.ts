import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() icon?: string;

  hidePassword = true;

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  get inputType(): string {
    if (this.type !== 'password') return this.type;
    return this.hidePassword ? 'password' : 'text';
  }

  get showError(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }
}
