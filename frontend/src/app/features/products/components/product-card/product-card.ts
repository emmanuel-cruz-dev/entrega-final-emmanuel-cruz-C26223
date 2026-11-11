import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { StarFill } from '@primeicons/angular/star-fill';

import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-product-card',
  imports: [CardModule, TagModule, StarFill],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
}
