import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthenticationService } from './services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SpinnerComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isUserAuthenticated!: Observable<User | null>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.init();
    this.isUserAuthenticated = this.authService.user$;
  }

}
