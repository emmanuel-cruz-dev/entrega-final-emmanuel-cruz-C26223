import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Plus } from '@primeicons/angular/plus';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';
import { StarFill } from '@primeicons/angular/star-fill';

import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';

@Component({
  selector: 'app-products-management',
  imports: [
    RouterLink,
    CurrencyPipe,
    DecimalPipe,
    ConfirmDialogModule,
    TableModule,
    TagModule,
    ButtonModule,
    Plus,
    Pencil,
    Trash,
    StarFill,
  ],
  templateUrl: './products-management.html',
})
export class ProductsManagement implements OnInit {
  private productService = inject(ProductService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products = signal<Product[]>([]);
  totalElements = signal<number>(0);
  loading = signal<boolean>(false);

  rows = 10;
  private first = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows;
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.productService
      .getAll({}, { page: Math.floor(this.first / this.rows), size: this.rows })
      .subscribe({
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

  onDelete(product: Product): void {
    this.confirmationService.confirm({
      header: 'Eliminar producto',
      message: `¿Estás seguro de que deseas eliminar "${product.name}"? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => this.deleteProduct(product),
    });
  }

  private deleteProduct(product: Product): void {
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.loadProducts();
        this.messageService.add({
          severity: 'success',
          summary: 'Producto eliminado',
          detail: `"${product.name}" se eliminó correctamente.`,
          life: 3000,
        });
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto. Intentá de nuevo.',
          life: 3000,
        });
      },
    });
  }
}
