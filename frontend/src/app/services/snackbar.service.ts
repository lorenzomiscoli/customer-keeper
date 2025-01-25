import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private duration = 3500;
  private successClass = 'snackbar-success';
  private errorClass = 'snackbar-error';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(private snackBar: MatSnackBar) {}

  public success(message: string, action = ''): void {
    this.snackBar.open(message, action, {
      panelClass: [this.successClass],
      duration: this.duration,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
    });
  }

  public error(message: string, action = ''): void {
    this.snackBar.open(message, action, {
      panelClass: [this.errorClass],
      duration: this.duration,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
    });
  }
}
