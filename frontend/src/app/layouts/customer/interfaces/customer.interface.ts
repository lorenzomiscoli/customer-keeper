import { FormControl } from '@angular/forms';

import { CustomerSort } from '../constants/customer-sort';

export interface Customer {
  id: number;
  name: string;
  logoLink?: string;
  email: string;
  phone: string;
  updatedDate: string;
}

export interface CustomerSearch {
  name: string;
  sort: CustomerSort;
  page?: number;
}

export interface CustomerInsert {
  name: string;
  email: string;
  phone: string;
}

export interface CustomerAddForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
