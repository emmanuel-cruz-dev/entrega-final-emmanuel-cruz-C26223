import { Component } from '@angular/core';

import { FeaturedProducts } from '../../products/components/featured-products/featured-products';

@Component({
  selector: 'app-landing',
  imports: [FeaturedProducts],
  templateUrl: './landing.html',
})
export class Landing {}
