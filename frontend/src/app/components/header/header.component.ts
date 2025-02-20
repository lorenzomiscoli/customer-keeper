import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { HEADER_DEPS } from './header.dependencies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [HEADER_DEPS],
})
export class HeaderComponent {
  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  public logout(): void {
    this.authService.logout();
  }

  public openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent,{ panelClass: "about-dialog" });
  }

}
