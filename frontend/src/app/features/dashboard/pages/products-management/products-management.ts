import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
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

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (res) => this.products.set(res),
      error: (err) => console.error('Error fetching products:', err),
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
        this.products.update((products) => products.filter((p) => p.id !== product.id));
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
