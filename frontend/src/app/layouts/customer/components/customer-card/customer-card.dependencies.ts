import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslocoDirective } from '@jsverse/transloco';
import { SecureImagePipe } from '../../../../pipes/secure-image.pipe';
import { UpdatedDateFormatPipe } from '../../../../pipes/updated-date-format';

export const CUSTOMER_CARD_DEPS = [
  AsyncPipe,
  RouterLink,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  UpdatedDateFormatPipe,
  TranslocoDirective,
  SecureImagePipe,
];
