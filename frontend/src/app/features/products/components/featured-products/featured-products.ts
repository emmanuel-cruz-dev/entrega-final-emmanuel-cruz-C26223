import { Component, inject, OnInit, signal } from '@angular/core';

import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ProductCarousel } from 'src/app/features/products/components/product-carousel/product-carousel';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCarousel],
  template: `
    <app-product-carousel
      title="Productos destacados"
      [products]="featuredProducts()"
      [loading]="loading()"
      emptyMessage="No hay productos destacados por ahora."
      viewAllLink="/products"
    />
  `,
})
export class FeaturedProducts implements OnInit {
  private productService = inject(ProductService);

  featuredProducts = signal<Product[]>([]);
  loading = signal<boolean>(false);
  slidesPerPage = signal(3);

  constructor() {
    const update = () =>
      this.slidesPerPage.set(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.productService.getAll({ featured: true }, { size: 12, sort: 'rating,desc' }).subscribe({
      next: (res) => {
        this.featuredProducts.set(res.content);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching featured products:', err);
        this.loading.set(false);
      },
    });
  }
}
