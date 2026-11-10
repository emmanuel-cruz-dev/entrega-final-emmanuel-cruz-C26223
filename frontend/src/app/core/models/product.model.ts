export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
  featured: boolean;
}

export type CreateProduct = Omit<Product, 'id'>;

export type UpdateProduct = Partial<Omit<Product, 'id'>>;
