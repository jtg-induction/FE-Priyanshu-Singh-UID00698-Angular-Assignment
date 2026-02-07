import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';

describe('NotFoundComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule, AppRoutingModule],
      declarations: [AppComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should navigate to notfoundComponent for unknown routes', async () => {
    await router.navigate(['/random-unknwonw']);
    expect(location.path()).toContain('');
  });
});
