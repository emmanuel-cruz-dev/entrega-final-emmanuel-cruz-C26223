export interface Category {
  id: number;
  name: string;
  description: string;
}

export type CreateCategory = Omit<Category, 'id'>;

export type UpdateCategory = Partial<Omit<Category, 'id'>>;
