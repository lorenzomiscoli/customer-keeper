import { Component, OnInit } from '@angular/core';

import { catchError, finalize, Observable, throwError } from 'rxjs';

import { SystemService } from '../../services/system.service';
import { getHttpErrorMsg } from '../../utils/string.utils';
import { ABOUT_DEPS } from './about-dialog.dependencies';

@Component({
  templateUrl: './about-dialog.component.html',
  styleUrl: './about-dialog.component.scss',
  imports: [ABOUT_DEPS],
})
export class AboutDialogComponent implements OnInit {
  public version$!: Observable<{ version: string }>;
  public isLoading = false;
  public errorMessage = '';

  constructor(private systemService: SystemService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.version$ = this.systemService.findVersion().pipe(
      catchError((err) => {
        this.errorMessage = getHttpErrorMsg(err);
        return throwError(() => err);
      }),
      finalize(() => (this.isLoading = false))
    );
  }
}
