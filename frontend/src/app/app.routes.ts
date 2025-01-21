import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/home/home.component'),
  },
  {
    path: 'customers/:id',
    loadComponent: () => import('./layouts/customers/customers.component'),
  },
];
