import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoDirective } from '@jsverse/transloco';

export const HEADER_DEPS = [
  MatButtonModule,
  MatIconModule,
  RouterLink,
  MatMenuModule,
  TranslocoDirective,
];
