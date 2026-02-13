import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/authService/auth.service';
import { NotificationService } from '@core/services/notificationService/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
    this.redirectToHome();
    this.notification.success('Logout Successfull');
  }
}
