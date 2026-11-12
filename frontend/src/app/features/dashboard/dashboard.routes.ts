import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProductsManagement } from './pages/products-management/products-management';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'products',
    component: ProductsManagement,
    title: 'Productos',
  },
];
