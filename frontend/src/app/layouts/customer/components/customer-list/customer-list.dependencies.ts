import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { CustomerDateFormatPipe } from '../../../../pipes/customer-date-format.pipe';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

export const CUSTOMER_LIST_DEPS = [
  AsyncPipe,
  RouterLink,
  MatCardModule,
  CustomerDateFormatPipe,
  SearchFilterComponent,
];
