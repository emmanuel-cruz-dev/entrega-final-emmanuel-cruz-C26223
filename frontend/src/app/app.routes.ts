import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.routes').then((m) => m.PRODUCT_ROUTES),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
    ],
  },
];
