import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { getBrowserLang, TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { User } from './interfaces/user.interface';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isUserAuthenticated!: Observable<User | null>;

  constructor(
    private authService: AuthenticationService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.authService.init();
    this.isUserAuthenticated = this.authService.user$;
    this.translocoService.setActiveLang(this.retriveDefaultLang());
  }

  private retriveDefaultLang(): string {
    const defaultLang = 'en';
    try {
      const browserLang = getBrowserLang();
      const availableLang = this.translocoService
        .getAvailableLangs()
        .find((value) => browserLang === value) as string;
      return availableLang ? availableLang : defaultLang;
    } catch (e) {
      return defaultLang;
    }
  }
}
