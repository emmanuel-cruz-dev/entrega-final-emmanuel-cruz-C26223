import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProductsManagement } from './pages/products-management/products-management';
import { ProductForm } from './pages/product-form/product-form';
import { CategoriesManagement } from './pages/categories-management/categories-management';
import { CategoryForm } from './pages/category-form/category-form';

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
  {
    path: 'categories',
    component: CategoriesManagement,
    title: 'Categorías',
  },
  {
    path: 'categories/new',
    component: CategoryForm,
    title: 'Nueva Categoría',
  },
  {
    path: 'categories/:id/edit',
    component: CategoryForm,
    title: 'Editar Categoría',
  },
];
