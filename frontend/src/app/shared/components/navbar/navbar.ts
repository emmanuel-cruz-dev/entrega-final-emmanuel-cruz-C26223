import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RippleModule, RouterLink, RouterLinkActive, PIcon],
  templateUrl: './navbar.html',
})
export class Navbar {
  items: MenuItem[] = [
    { label: 'Inicio', icon: 'home', routerLink: '/' },
    { label: 'Dashboard', icon: 'objects-column', routerLink: '/dashboard' },
  ];
}
