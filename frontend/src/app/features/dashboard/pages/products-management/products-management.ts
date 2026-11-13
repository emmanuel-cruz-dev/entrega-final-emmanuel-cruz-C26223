import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Plus } from '@primeicons/angular/plus';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';
import { StarFill } from '@primeicons/angular/star-fill';

import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';

@Component({
  selector: 'app-products-management',
  imports: [
    RouterLink,
    CurrencyPipe,
    DecimalPipe,
    TableModule,
    TagModule,
    ButtonModule,
    Plus,
    Pencil,
    Trash,
    StarFill,
  ],
  templateUrl: './products-management.html',
})
export class ProductsManagement implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (res) => this.products.set(res),
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  onDelete(product: Product): void {
    // TODO: adds confirmation modal
    window.alert(`¿Estás seguro de que deseas eliminar el producto ${product.name}?`);
  }
}
