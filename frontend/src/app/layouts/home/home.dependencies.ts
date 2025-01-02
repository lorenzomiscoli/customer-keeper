import { AsyncPipe } from '@angular/common';

import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';

export const HOME_DEPS = [
  AsyncPipe,
  CustomerDetailsComponent,
  SearchFilterComponent,
];
