import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { LoadingService } from '@core/services/loadingService/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  title = 'DevAlgo';
  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
