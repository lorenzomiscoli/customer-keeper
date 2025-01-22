import { Route } from '@angular/router';

export const CUSTOMER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/customer-list/customer-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/customer-add/customer-add.component'),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./components/customer-details/customer-details.component'),
  },
];
