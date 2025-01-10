import { CustomerSort } from '../app/constants/customer-sort';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/api',
  defaultCustomerSort: CustomerSort.NAME,
};
