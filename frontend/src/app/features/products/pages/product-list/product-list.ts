import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonDirective } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PIcon } from '@primeicons/angular/p-icon';

import { Product, ProductFilter } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductFilters } from '../../components/product-filters/product-filters';
import { ProductCardSkeleton } from '../../components/product-card-skeleton/product-card-skeleton';

@Component({
  selector: 'app-product-list',
  imports: [
    PaginatorModule,
    ButtonDirective,
    DrawerModule,
    PIcon,
    ProductCard,
    ProductFilters,
    ProductCardSkeleton,
  ],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  totalElements = signal<number>(0);
  hasActiveFilters = computed(() => Object.keys(this.filter()).length > 0);
  visible: boolean = false;

  filter = signal<ProductFilter>({});
  page = signal<number>(0);
  size = signal<number>(12);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.productService.getAll(this.filter(), { page: this.page(), size: this.size() }).subscribe({
      next: (res) => {
        this.products.set(res.content);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading.set(false);
      },
    });
  }

  onFilterChange(filter: ProductFilter): void {
    this.filter.set(filter);
    this.page.set(0);
    this.load();
  }

  onPageChange(event: { page?: number; rows?: number }): void {
    this.page.set(event.page ?? 0);
    this.size.set(event.rows ?? 12);
    this.load();
  }
}
