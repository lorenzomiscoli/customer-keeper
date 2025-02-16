import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoDirective } from '@jsverse/transloco';

import { CustomerEditComponent } from '../tabs/customer-edit/customer-edit.component';

export const CUSTOMER_DETAILS_DEPS = [
  MatTabsModule,
  MatIconModule,
  CustomerEditComponent,
  TranslocoDirective,
];
