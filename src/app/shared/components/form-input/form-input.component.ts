import { Component, inject, Input } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  @Input() lablel = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';

  public ngControl = inject(NgControl);
  private formGrouppDirective = inject(FormGroupDirective);

  // get cont
}
