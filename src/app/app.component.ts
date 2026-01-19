import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          🚀 Практична робота №7: Роутинг
        </a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/items" routerLinkActive="active">
            📋 Список товарів
          </a>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer class="mt-5 py-3 bg-light text-center">
      <div class="container">
        <p class="mb-1 text-muted">
          <strong>Практична робота №7:</strong> Налаштування роутингу
        </p>
        <p class="mb-0 text-muted small">
          Роутинг, динамічні маршрути, routerLink
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .nav-link.active {
      font-weight: bold;
      color: #fff !important;
      background-color: rgba(255,255,255,0.1);
      border-radius: 4px;
    }
    footer {
      margin-top: auto;
    }
  `]
})
export class AppComponent {}
