import { Component } from '@angular/core';

import { ErrorSection } from '../../components/error-section';

@Component({
  selector: 'app-not-found',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="404"
      icon="search"
      title="Página no encontrada"
      description="La página que buscás no existe o fue removida."
    />
  `,
})
export class NotFound {}
