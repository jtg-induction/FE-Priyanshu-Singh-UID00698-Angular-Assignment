import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() icon?: string;

  debouncedErrors$!: Observable<ValidationErrors | null>;
  hidePassword = true;

  ngOnInit(): void {
    this.debouncedErrors$ = this.control.statusChanges.pipe(
      startWith(this.control.status),
      debounceTime(500),
      map(() => this.control.errors)
    );
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  get inputType(): string {
    if (this.type !== 'password') return this.type;
    return this.hidePassword ? 'password' : 'text';
  }
}
