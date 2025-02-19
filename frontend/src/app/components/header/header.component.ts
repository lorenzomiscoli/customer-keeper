import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { HEADER_DEPS } from './header.dependencies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [HEADER_DEPS],
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService) {}

  public logout(): void {
    this.authService.logout();
  }
}
