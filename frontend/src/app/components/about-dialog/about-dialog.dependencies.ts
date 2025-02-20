import { AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoDirective } from '@jsverse/transloco';

export const ABOUT_DEPS = [
  AsyncPipe,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  TranslocoDirective,
];
