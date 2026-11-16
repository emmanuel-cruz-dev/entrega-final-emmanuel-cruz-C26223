import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ArrowLeft } from '@primeicons/angular/arrow-left';

import { Category, CreateProduct } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';
import { CategoryService } from 'src/app/features/categories/services/category.service';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    ToggleSwitchModule,
    ButtonModule,
    MessageModule,
    SelectModule,
    ArrowLeft,
  ],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  productId = signal<number | null>(null);
  loading = signal(false);
  saving = signal(false);
  categories = signal<Category[]>([]);
  categoriesLoaded = signal(false);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    brand: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    rating: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.max(5)],
    }),
    imageUrl: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    featured: new FormControl(false, { nonNullable: true }),
  });

  get isEdit(): boolean {
    return this.productId() !== null;
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (cats) => {
        this.categories.set(cats);
        this.categoriesLoaded.set(true);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.categoriesLoaded.set(true);
      },
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productId.set(Number(id));
    this.loading.set(true);

    this.productService.getById(Number(id)).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          categoryId: product.category?.id ?? null,
          brand: product.brand,
          price: product.price,
          rating: product.rating,
          imageUrl: product.imageUrl,
          featured: product.featured,
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.router.navigate(['/dashboard/products']);
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

    const raw = this.form.getRawValue();
    const payload: CreateProduct = {
      name: raw.name,
      description: raw.description,
      category: { id: raw.categoryId! },
      brand: raw.brand,
      price: raw.price!,
      rating: raw.rating,
      imageUrl: raw.imageUrl,
      featured: raw.featured,
    };

    const id = this.productId();
    this.saving.set(true);

    const request$ =
      id !== null ? this.productService.update(id, payload) : this.productService.create(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/dashboard/products']),
      error: (err) => {
        console.error('Error saving product:', err);
        this.saving.set(false);
      },
    });
  }
}
