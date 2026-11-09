import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonDirective],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
