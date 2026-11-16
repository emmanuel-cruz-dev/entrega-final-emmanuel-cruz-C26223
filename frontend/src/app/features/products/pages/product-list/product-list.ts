import { Component, inject, OnInit, signal } from '@angular/core';
import { FolderOpen } from '@primeicons/angular/folder-open';
import { PIcon } from '@primeicons/angular/p-icon';

import { Product } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, FolderOpen, PIcon],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products.set(res);
        console.log(this.products());
      },
      error: (err) => console.error('Error fetching featured products:', err),
    });
  }
}
