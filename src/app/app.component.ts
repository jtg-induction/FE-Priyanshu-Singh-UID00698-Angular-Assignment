import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  title = 'DevAlgo';
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.spinner.show();
      if (event instanceof NavigationError) {
        this.spinner.hide();
        this.router.navigate(['/error']);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) this.spinner.hide();
    });
  }
}
