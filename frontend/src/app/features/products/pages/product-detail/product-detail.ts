import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ArrowLeft } from '@primeicons/angular/arrow-left';
import { StarFill } from '@primeicons/angular/star-fill';

import { Product } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe, TagModule, ButtonModule, SkeletonModule, ArrowLeft, StarFill],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  protected readonly Math = Math;

  product = signal<Product | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  stars = [0, 1, 2, 3, 4];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    this.loading.set(true);
    this.productService.getById(Number(id)).subscribe({
      next: (res) => {
        this.product.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.error.set('No se pudo cargar el producto.');
        this.loading.set(false);
      },
    });
  }
}
