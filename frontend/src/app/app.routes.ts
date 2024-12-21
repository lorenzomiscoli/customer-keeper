import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./layouts/home/home.component')
  }
];
