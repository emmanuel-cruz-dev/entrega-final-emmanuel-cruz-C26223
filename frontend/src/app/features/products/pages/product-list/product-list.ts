import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonDirective } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PIcon } from '@primeicons/angular/p-icon';

import { Product, ProductFilter } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductFilters } from '../../components/product-filters/product-filters';
import { ProductCardSkeleton } from '../../components/product-card-skeleton/product-card-skeleton';
import {
  DEFAULT_PAGE_SIZE,
  queryParamsToState,
  stateToQueryParams,
} from '../../utils/product-query-params';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  totalElements = signal<number>(0);
  visible: boolean = false;

  filter = signal<ProductFilter>({});
  page = signal<number>(0);
  size = signal<number>(DEFAULT_PAGE_SIZE);
  hasActiveFilters = computed(() => Object.keys(this.filter()).length > 0);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params) => {
          const state = queryParamsToState(params);
          this.filter.set(state.filter);
          this.page.set(state.page);
          this.size.set(state.size);
          this.loading.set(true);
        }),
        switchMap(() =>
          this.productService.getAll(this.filter(), { page: this.page(), size: this.size() }).pipe(
            catchError((err) => {
              console.error('Error fetching products:', err);
              this.loading.set(false);
              return EMPTY;
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.products.set(res.content);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      });
  }

  onFilterChange(filter: ProductFilter): void {
    this.updateUrl({ filter, page: 0, size: this.size() });
  }

  onPageChange(event: { page?: number; rows?: number }): void {
    this.updateUrl({
      filter: this.filter(),
      page: event.page ?? 0,
      size: event.rows ?? DEFAULT_PAGE_SIZE,
    });
  }

  private updateUrl(state: { filter: ProductFilter; page: number; size: number }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: stateToQueryParams(state),
    });
  }
}
