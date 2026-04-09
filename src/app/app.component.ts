import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `]
})
export class AppComponent {
  title = 'web-dev-app';
}
