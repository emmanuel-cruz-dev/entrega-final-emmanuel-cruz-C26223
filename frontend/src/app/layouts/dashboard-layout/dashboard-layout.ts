import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navbar, Footer } from '@shared';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, Navbar, Footer],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {}
