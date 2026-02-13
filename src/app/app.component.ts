import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { LoadingService } from '@core/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  title = 'DevAlgo';
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.loadingService.show();

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationCancel
      ) {
        this.loadingService.hide();
        if (event instanceof NavigationError) {
          this.router.navigate(['/error']);
        }
      }
    });
  }
}
