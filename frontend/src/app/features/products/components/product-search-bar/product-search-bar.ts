import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  selector: 'app-product-search-bar',
  imports: [ReactiveFormsModule, InputTextModule, ButtonDirective, PIcon],
  templateUrl: './product-search-bar.html',
})
export class ProductSearchBar {
  private router = inject(Router);

  form = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });

  onSubmit(): void {
    const term = this.form.controls.search.value.trim();

    this.router.navigate(['/products'], {
      queryParams: term ? { search: term } : {},
    });
  }
}
