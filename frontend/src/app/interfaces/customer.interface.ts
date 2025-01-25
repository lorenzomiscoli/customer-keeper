import { CustomerSort } from '../constants/customer-sort';

export interface Customer {
  id: number;
  name: string;
  logoLink?: string;
  updatedDate: string;
}

export interface CustomerSearch {
  name: string;
  sort: CustomerSort;
}

export interface CustomerInsert {
  name: string;
  email: string;
  phone: string;
}
