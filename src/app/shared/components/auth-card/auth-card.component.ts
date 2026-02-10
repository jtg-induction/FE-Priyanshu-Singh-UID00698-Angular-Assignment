import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.scss',
})
export class AuthCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() footerText?: string;
  @Input() footerLink?: string;
  @Input() footerLinkText?: string;
}
