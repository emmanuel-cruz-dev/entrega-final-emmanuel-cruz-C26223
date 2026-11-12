import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '@primeicons/angular/sidebar';
import { PIcon } from '@primeicons/angular/p-icon';

import { Navbar, Footer } from '@shared';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, SidebarModule, ButtonModule, Sidebar, PIcon, Navbar, Footer],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout implements OnInit, OnDestroy {
  isMobile = signal(false);
  open = signal(true);

  private mql?: MediaQueryList;
  private mqlListener?: (e: MediaQueryListEvent) => void;

  navItems: NavItem[] = [
    { icon: 'objects-column', label: 'Dashboard', route: '/dashboard', exact: true },
    { icon: 'box', label: 'Productos', route: '/dashboard/products' },
  ];

  ngOnInit() {
    if (typeof window === 'undefined') return;
    this.mql = window.matchMedia('(max-width: 1023px)');
    this.isMobile.set(this.mql.matches);
    this.open.set(!this.mql.matches);
    this.mqlListener = (e) => {
      this.isMobile.set(e.matches);
      this.open.set(!e.matches);
    };
    this.mql.addEventListener('change', this.mqlListener);
  }

  ngOnDestroy() {
    if (this.mqlListener) this.mql?.removeEventListener('change', this.mqlListener);
  }
}
