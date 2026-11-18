import { Component } from '@angular/core';

import { ErrorSection } from '../../components/error-section';

@Component({
  selector: 'app-forbidden',
  imports: [ErrorSection],
  template: `
    <app-error-section
      code="403"
      icon="lock"
      title="Acceso denegado"
      description="No tenés permisos para ver esta página."
    />
  `,
})
export class Forbidden {}
