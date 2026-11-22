import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ChevronLeft } from '@primeicons/angular/chevron-left';
import { ChevronRight } from '@primeicons/angular/chevron-right';

import { Product } from 'src/app/core/models';
import { ProductCard } from 'src/app/features/products/components/product-card/product-card';
import { ProductCardSkeleton } from 'src/app/features/products/components/product-card-skeleton/product-card-skeleton';

@Component({
  selector: 'app-product-carousel',
  imports: [
    RouterLink,
    ProductCard,
    CarouselModule,
    ButtonModule,
    ChevronLeft,
    ChevronRight,
    ProductCardSkeleton,
  ],
  templateUrl: './product-carousel.html',
})
export class ProductCarousel {
  title = input.required<string>();
  products = input<Product[]>([]);
  loading = input(false);
  emptyMessage = input('No hay productos para mostrar por ahora.');

  viewAllLink = input<string>('');
  viewAllLabel = input('Ver todos los productos');
  viewAllQueryParams = input<Record<string, unknown> | null>(null);

  slidesPerPage = signal(this.calcSlides());

  constructor() {
    const update = () => this.slidesPerPage.set(this.calcSlides());
    window.addEventListener('resize', update);
  }

  private calcSlides(): number {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }
}
