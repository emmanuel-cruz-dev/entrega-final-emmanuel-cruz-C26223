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

export type UpdateProduct = Partial<Omit<Product, 'id' | 'category'>> & { category?: { id: number } };
