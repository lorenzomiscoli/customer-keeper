import { Routes } from '@angular/router';

import { authenticationGuard } from './guards/authentication.guard';
import { CUSTOMER_ROUTES } from './layouts/customer/customer.routing';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./layouts/login/login.component'),
    title: 'Customer Keeper',
  },
  {
    path: 'customers',
    loadComponent: () => import('./layouts/customer/customer.component'),
    children: CUSTOMER_ROUTES,
    canActivate: [authenticationGuard],
  },
];
