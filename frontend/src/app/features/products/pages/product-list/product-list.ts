import { Component, inject, OnInit, signal } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';

import { Product } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductCardSkeleton } from '../../components/product-card-skeleton/product-card-skeleton';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, PIcon, ProductCardSkeleton],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching featured products:', err);
        this.loading.set(false);
      },
    });
  }
}
