import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { Home } from '@primeicons/angular/home';
import { ObjectsColumn } from '@primeicons/angular/objects-column';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RippleModule, RouterLink, RouterLinkActive, Home, ObjectsColumn],
  templateUrl: './navbar.html',
})
export class Navbar {
  items: MenuItem[] = [
    { label: 'Inicio', icon: 'home', routerLink: '/' },
    { label: 'Dashboard', icon: 'objects-column', routerLink: '/dashboard' },
  ];
}
