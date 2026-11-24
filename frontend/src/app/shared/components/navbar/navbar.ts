import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { PIcon } from '@primeicons/angular/p-icon';

import { ProductSearchBar } from 'src/app/features/products/components/product-search-bar/product-search-bar';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RippleModule, RouterLink, RouterLinkActive, PIcon, ProductSearchBar],
  templateUrl: './navbar.html',
})
export class Navbar {
  items: MenuItem[] = [
    { label: 'Inicio', icon: 'home', routerLink: '/' },
    { label: 'Productos', icon: 'box', routerLink: '/products' },
    { label: 'Dashboard', icon: 'objects-column', routerLink: '/dashboard' },
  ];
}
