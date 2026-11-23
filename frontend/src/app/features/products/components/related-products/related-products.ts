import { Component, effect, inject, input, signal } from '@angular/core';

import { ProductCarousel } from '../product-carousel/product-carousel';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/core/models';
import { FeaturedProducts } from '../featured-products/featured-products';

@Component({
  selector: 'app-related-products',
  imports: [ProductCarousel, FeaturedProducts],
  template: `
    @if(products().length > 0) {
    <app-product-carousel
      title="Productos relacionados"
      [products]="products()"
      [loading]="loading()"
      emptyMessage="No encontramos productos relacionados."
      viewAllLink="/products"
      [viewAllQueryParams]="{ categoryId: product().category.id }"
    />
    } @else {
    <app-featured-products />
    }
  `,
})
export class RelatedProducts {
  private productService = inject(ProductService);

  product = input.required<Product>();

  products = signal<Product[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      const current = this.product();
      if (!current?.category?.id) {
        this.products.set([]);
        this.loading.set(false);
        return;
      }

      this.loading.set(true);

      this.productService
        .getAll({ categoryId: [current.category.id] }, { size: 13, sort: 'rating,desc' })
        .subscribe({
          next: (res) => {
            this.products.set(res.content.filter((p) => p.id !== current.id).slice(0, 12));
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
    });
  }
}
