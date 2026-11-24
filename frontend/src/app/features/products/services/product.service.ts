import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Product,
  CreateProduct,
  UpdateProduct,
  PageResponse,
  ProductFilter,
  PageParams,
} from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAll(
    filter: ProductFilter = {},
    pageParams: PageParams = {}
  ): Observable<PageResponse<Product>> {
    let params = new HttpParams();

    const { categoryId, ...rest } = filter;

    Object.entries({ ...rest, ...pageParams }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    categoryId?.forEach((id) => {
      params = params.append('categoryId', id);
    });

    return this.http.get<PageResponse<Product>>(this.apiUrl, { params });
  }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: UpdateProduct): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
