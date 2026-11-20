import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
  featured: boolean;
}

export type CreateProduct = Omit<Product, 'id' | 'category'> & { category: { id: number } };

export type UpdateProduct = Partial<Omit<Product, 'id' | 'category'>> & {
  category?: { id: number };
};

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ProductFilter {
  search?: string;
  categoryId?: number[];
  brand?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}
