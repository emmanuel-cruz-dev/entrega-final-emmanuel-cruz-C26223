import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe, NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ChartModule } from 'primeng/chart';
import { PIcon } from '@primeicons/angular/p-icon';

import { Product, Category } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';
import { CategoryService } from 'src/app/features/categories/services';

interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  colorClass: string;
  route?: string;
}

interface BrandStat {
  name: string;
  count: number;
  avgRating: number;
  avgPrice: number;
}

interface CategoryStat {
  name: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    CurrencyPipe,
    DecimalPipe,
    NgClass,
    ButtonModule,
    SkeletonModule,
    ChartModule,
    PIcon,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  loading = signal(true);
  error = signal<string | null>(null);

  allProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<string[]>([]);
  totalProducts = signal(0);

  featuredCount = computed(() => this.allProducts().filter((p) => p.featured).length);

  avgRating = computed(() => {
    const products = this.allProducts();
    if (!products.length) return 0;
    return products.reduce((sum, p) => sum + (p.rating ?? 0), 0) / products.length;
  });

  avgPrice = computed(() => {
    const products = this.allProducts();
    if (!products.length) return 0;
    return products.reduce((sum, p) => sum + (p.price ?? 0), 0) / products.length;
  });

  statCards = computed<StatCard[]>(() => [
    {
      label: 'Productos',
      value: this.totalProducts(),
      icon: 'box',
      colorClass: 'text-blue-500',
      route: '/dashboard/products',
    },
    {
      label: 'Categorías',
      value: this.categories().length,
      icon: 'tag',
      colorClass: 'text-violet-500',
      route: '/dashboard/categories',
    },
    {
      label: 'Marcas',
      value: this.brands().length,
      icon: 'star',
      colorClass: 'text-amber-500',
    },
    {
      label: 'Destacados',
      value: this.featuredCount(),
      icon: 'star-fill',
      colorClass: 'text-emerald-500',
    },
  ]);

  brandStats = computed<BrandStat[]>(() => {
    const products = this.allProducts();
    const map = new Map<string, Product[]>();
    for (const p of products) {
      if (!p.brand) continue;
      const list = map.get(p.brand) ?? [];
      list.push(p);
      map.set(p.brand, list);
    }
    return Array.from(map.entries())
      .map(([name, prods]) => ({
        name,
        count: prods.length,
        avgRating: prods.reduce((s, p) => s + (p.rating ?? 0), 0) / prods.length,
        avgPrice: prods.reduce((s, p) => s + (p.price ?? 0), 0) / prods.length,
      }))
      .sort((a, b) => b.count - a.count);
  });

  categoryStats = computed<CategoryStat[]>(() => {
    const products = this.allProducts();
    const map = new Map<string, number>();
    for (const p of products) {
      const name = p.category?.name ?? 'Sin categoría';
      map.set(name, (map.get(name) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  });

  topRated = computed(() =>
    [...this.allProducts()].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5)
  );

  categoryChartData = computed(() => {
    const stats = this.categoryStats();
    const palette = [
      '#6366f1',
      '#8b5cf6',
      '#a78bfa',
      '#c4b5fd',
      '#ddd6fe',
      '#818cf8',
      '#4f46e5',
      '#7c3aed',
      '#5b21b6',
      '#4c1d95',
    ];
    return {
      labels: stats.map((s) => s.name),
      datasets: [
        {
          data: stats.map((s) => s.count),
          backgroundColor: stats.map((_, i) => palette[i % palette.length]),
          hoverOffset: 8,
        },
      ],
    };
  });

  brandChartData = computed(() => {
    const stats = this.brandStats().slice(0, 8);
    return {
      labels: stats.map((s) => s.name),
      datasets: [
        {
          label: 'Productos',
          data: stats.map((s) => s.count),
          backgroundColor: '#6366f1',
          borderRadius: 6,
        },
      ],
    };
  });

  chartOptions = {
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  doughnutOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
  };

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      categories: this.categoryService.getAll(),
      brands: this.productService.getBrands(),
      productsPage: this.productService.getAll({}, { page: 0, size: 1000 }),
    }).subscribe({
      next: ({ categories, brands, productsPage }) => {
        this.categories.set(categories);
        this.brands.set(brands);
        this.allProducts.set(productsPage.content);
        this.totalProducts.set(productsPage.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.error.set(
          'No se pudieron cargar los datos del dashboard. Verificá que el servidor esté activo.'
        );
        this.loading.set(false);
      },
    });
  }

  retry(): void {
    this.loadDashboardData();
  }
}
