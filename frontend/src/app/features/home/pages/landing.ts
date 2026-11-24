import { Component } from '@angular/core';

import { FeaturedProducts } from '../../products/components/featured-products/featured-products';
import { ProductSearchBar } from '../../products/components/product-search-bar/product-search-bar';

@Component({
  selector: 'app-landing',
  imports: [FeaturedProducts, ProductSearchBar],
  templateUrl: './landing.html',
})
export class Landing {}
