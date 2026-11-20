import { Component, DestroyRef, inject, OnInit, output, signal, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonDirective } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

import { Category, ProductFilter } from 'src/app/core/models';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/features/categories/services';

@Component({
  selector: 'app-product-filters',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    SelectModule,
    ToggleSwitchModule,
    ButtonDirective,
    PIcon,
  ],
  templateUrl: './product-filters.html',
})
export class ProductFilters implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  filterChange = output<ProductFilter>();

  categories = signal<Category[]>([]);
  brands = signal<string[]>([]);

  ratingOptions = [
    { label: '4 estrellas o más', value: 4 },
    { label: '3 estrellas o más', value: 3 },
    { label: '2 estrellas o más', value: 2 },
    { label: '1 estrella o más', value: 1 },
  ];

  form = this.fb.group({
    search: [''],
    categoryId: [[] as number[]],
    brand: [null as string | null],
    featured: [false],
    minPrice: [null as number | null],
    maxPrice: [null as number | null],
    minRating: [null as number | null],
  });

  private formValues = toSignal(
    this.form.valueChanges.pipe(
      map(() => this.buildFilter()),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ),
    { initialValue: this.buildFilter() }
  );

  hasActiveFilters = computed(() => Object.keys(this.formValues()).length > 0);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res) => this.categories.set(res));
    this.productService.getBrands().subscribe((res) => this.brands.set(res));

    this.form.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.filterChange.emit(this.buildFilter()));
  }

  clear(): void {
    this.form.reset({ search: '', categoryId: [], featured: false });
  }

  private buildFilter(): ProductFilter {
    const v = this.form.getRawValue();
    const filter: ProductFilter = {};

    if (v.search?.trim()) filter.search = v.search.trim();
    if (v.categoryId?.length) filter.categoryId = v.categoryId;
    if (v.brand) filter.brand = v.brand;
    if (v.featured) filter.featured = true;
    if (v.minPrice != null) filter.minPrice = v.minPrice;
    if (v.maxPrice != null) filter.maxPrice = v.maxPrice;
    if (v.minRating != null) filter.minRating = v.minRating;

    return filter;
  }
}
