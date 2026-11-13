import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  items: MenuItem[] = [
    { label: 'Inicio', routerLink: '/' },
    { label: 'Productos', routerLink: '/products' },
    { label: 'Dashboard', routerLink: '/dashboard' },
  ];
}
