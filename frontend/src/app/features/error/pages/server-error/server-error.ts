import { Component } from '@angular/core';

import { ErrorSection } from '../../components/error-section';

@Component({
  selector: 'app-server-error',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="500"
      icon="exclamation-triangle"
      title="Error del servidor"
      description="Algo salió mal de nuestro lado. Intentá de nuevo más tarde."
      buttonText="Ir al catálogo"
      link="/products"
    />
  `,
})
export class ServerError {}
