import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ProductCard } from 'src/app/features/products/components/product-card/product-card';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCard, CarouselModule, ButtonModule, ChevronLeft, ChevronRight],
  templateUrl: './featured-products.html',
})
export class FeaturedProducts implements OnInit {
  private productService = inject(ProductService);

  featuredProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.featuredProducts.set(res.filter((p) => p.featured));
      },
      error: (err) => console.error('Error fetching featured products:', err),
    });
  }
}
