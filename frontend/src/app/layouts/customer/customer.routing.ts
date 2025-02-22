import { Route } from '@angular/router';

export const CUSTOMER_ROUTES: Route[] = [
  {
    path: '',
    title: 'Customer Keeper',
    loadComponent: () =>
      import('./components/customer-list/customer-list.component'),
  },
  {
    path: 'new',
    title: 'Add Customer | Customer Keeper',
    loadComponent: () =>
      import('./components/customer-add/customer-add.component'),
  },
  {
    path: 'details/:id',
    title: 'Customer Details | Customer Keeper',
    loadComponent: () =>
      import('./components/customer-details/customer-details.component'),
  },
];
