import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ArrowLeft } from '@primeicons/angular/arrow-left';

import { CreateCategory } from 'src/app/core/models';
import { CategoryService } from 'src/app/features/categories/services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    MessageModule,
    ArrowLeft,
  ],
  templateUrl: './category-form.html',
})
export class CategoryForm implements OnInit {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categoryId = signal<number | null>(null);
  loading = signal(false);
  saving = signal(false);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
  });

  get isEdit(): boolean {
    return this.categoryId() !== null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.categoryId.set(Number(id));
    this.loading.set(true);

    this.categoryService.getById(Number(id)).subscribe({
      next: ({ id: _id, ...category }) => {
        this.form.patchValue(category);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching category:', err);
        this.router.navigate(['/dashboard/categories']);
      },
    });
  }

  hasError(controlName: keyof typeof this.form.controls, error: string): boolean {
    const control = this.form.controls[controlName];
    return control.hasError(error) && (control.touched || control.dirty);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as CreateCategory;
    const id = this.categoryId();
    this.saving.set(true);

    const request$ =
      id !== null
        ? this.categoryService.update(id, value)
        : this.categoryService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/dashboard/categories']),
      error: (err) => {
        console.error('Error saving category:', err);
        this.saving.set(false);
      },
    });
  }
}

