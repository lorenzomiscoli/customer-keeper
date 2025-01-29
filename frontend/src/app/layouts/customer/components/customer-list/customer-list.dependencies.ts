import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CustomerDateFormatPipe } from '../../../../pipes/customer-date-format.pipe';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

export const CUSTOMER_LIST_DEPS = [
  AsyncPipe,
  RouterLink,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  CustomerDateFormatPipe,
  SearchFilterComponent,
];
