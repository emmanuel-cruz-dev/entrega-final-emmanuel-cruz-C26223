import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Plus } from '@primeicons/angular/plus';
import { Pencil } from '@primeicons/angular/pencil';
import { Trash } from '@primeicons/angular/trash';

import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/features/categories/services';

@Component({
  selector: 'app-categories-management',
  imports: [RouterLink, ConfirmDialogModule, TableModule, ButtonModule, Plus, Pencil, Trash],
  templateUrl: './categories-management.html',
})
export class CategoriesManagement implements OnInit {
  private categoryService = inject(CategoryService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories.set(res),
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  onDelete(category: Category): void {
    this.confirmationService.confirm({
      header: 'Eliminar categoría',
      message: `¿Estás seguro de que deseas eliminar "${category.name}"? Esta acción no se puede deshacer.`,
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
      accept: () => this.deleteCategory(category),
    });
  }

  private deleteCategory(category: Category): void {
    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.categories.update((cats) => cats.filter((c) => c.id !== category.id));
        this.messageService.add({
          severity: 'success',
          summary: 'Categoría eliminada',
          detail: `"${category.name}" se eliminó correctamente.`,
          life: 3000,
        });
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la categoría. Intentá de nuevo.',
          life: 3000,
        });
      },
    });
  }
}
