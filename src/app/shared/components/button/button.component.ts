import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'basic' = 'primary';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() spinnerSize = 20;
  @Output() clicked = new EventEmitter<void>();
  onClick(): void {
    if (!this.loading) this.clicked.emit();
  }
}
