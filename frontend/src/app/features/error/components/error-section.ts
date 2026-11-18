import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  selector: 'app-error-section',
  imports: [RouterLink, ButtonModule, PIcon],
  templateUrl: './error-section.html',
})
export class ErrorSection {
  @Input({ required: true }) code!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() buttonText: string = 'Volver al inicio';
  @Input() link: string = '/';
}
