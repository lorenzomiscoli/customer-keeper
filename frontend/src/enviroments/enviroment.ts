import { CustomerSort } from '../app/layouts/customer/constants/customer-sort';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/api',
  defaultCustomerSort: CustomerSort.NAME,
};
