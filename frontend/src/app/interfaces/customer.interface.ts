import { CustomerSort } from '../constants/customer-sort';

export interface Customer {
  id: number;
  name: string;
  logoLink?: string;
}

export interface CustomerSearch {
  name: string;
  sort: CustomerSort;
}
