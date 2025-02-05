import { AsyncPipe } from '@angular/common';

import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

export const CUSTOMER_LIST_DEPS = [
  AsyncPipe,
  SearchFilterComponent,
  PaginationComponent,
  CustomerCardComponent
];
