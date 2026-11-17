import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ProductCard } from 'src/app/features/products/components/product-card/product-card';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCard, CarouselModule, ButtonModule, SkeletonModule, ChevronLeft, ChevronRight],
  templateUrl: './featured-products.html',
})
export class FeaturedProducts implements OnInit {
  private productService = inject(ProductService);

  featuredProducts = signal<Product[]>([]);
  loading = signal<boolean>(false);
  slidesPerPage = signal(3);
  skeletonItems = Array.from({ length: 3 });

  constructor() {
    const update = () =>
      this.slidesPerPage.set(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (res) => {
        this.featuredProducts.set(res.filter((p) => p.featured));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching featured products:', err);
        this.loading.set(false);
      },
    });
  }
}
