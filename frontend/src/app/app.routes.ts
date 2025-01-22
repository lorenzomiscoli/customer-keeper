import { Routes } from '@angular/router';
import { CUSTOMER_ROUTES } from './layouts/customer/customer.routing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: 'customers',
    loadComponent: () => import('./layouts/customer/customer.component'),
    children: CUSTOMER_ROUTES,
  },
];
