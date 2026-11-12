import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ArrowLeft } from '@primeicons/angular/arrow-left';

import { CreateProduct } from 'src/app/core/models';
import { ProductService } from 'src/app/features/products/services/product.service';

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
    ArrowLeft,
  ],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  productId = signal<number | null>(null);
  loading = signal(false);
  saving = signal(false);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productId.set(Number(id));
    this.loading.set(true);

    this.productService.getById(Number(id)).subscribe({
      next: ({ id: _id, ...product }) => {
        this.form.patchValue(product);
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

    const value = this.form.getRawValue() as CreateProduct;
    const id = this.productId();

    this.saving.set(true);

    const request$ =
      id !== null ? this.productService.update(id, value) : this.productService.create(value);

    request$.subscribe({
      next: () => this.router.navigate(['/dashboard/products']),
      error: (err) => {
        console.error('Error saving product:', err);
        this.saving.set(false);
      },
    });
  }
}
