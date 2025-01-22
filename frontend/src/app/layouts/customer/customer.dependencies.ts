import { AsyncPipe } from '@angular/common';

import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';

export const CUSTOMER_DEPS = [
  AsyncPipe,
  CustomerCardComponent,
  SearchFilterComponent,
];
