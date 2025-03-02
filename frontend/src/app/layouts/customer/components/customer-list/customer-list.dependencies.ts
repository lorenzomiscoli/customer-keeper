import { AsyncPipe, NgOptimizedImage } from '@angular/common';

import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { TranslocoDirective } from '@jsverse/transloco';

export const CUSTOMER_LIST_DEPS = [
  AsyncPipe,
  NgOptimizedImage,
  SearchFilterComponent,
  PaginationComponent,
  CustomerCardComponent,
  TranslocoDirective,
];
