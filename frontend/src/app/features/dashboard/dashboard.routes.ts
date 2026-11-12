import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProductsManagement } from './pages/products-management/products-management';
import { ProductForm } from './pages/product-form/product-form';

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
  {
    path: 'products/new',
    component: ProductForm,
    title: 'Nuevo Producto',
  },
  {
    path: 'products/:id/edit',
    component: ProductForm,
    title: 'Editar Producto',
  },
];
