import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/customer/customer.component'),
  },
  {
    path: 'customers/:id',
    loadComponent: () => import('./layouts/customer/components/customer-details/customer-details.component'),
  },
];
