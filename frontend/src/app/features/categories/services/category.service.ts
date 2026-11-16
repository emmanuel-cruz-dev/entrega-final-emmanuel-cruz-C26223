import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, CreateCategory, UpdateCategory } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:8080/api/product-categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(category: CreateCategory): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  update(id: number, category: UpdateCategory): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

