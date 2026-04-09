import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">Товари</a>
          
          <nav class="nav">
            @if (isAuth$ | async) {
              <span class="user-name">{{ (currentUser$ | async)?.name }}</span>
              <a routerLink="/product/new" class="nav-link">+ Додати товар</a>
              <button (click)="onLogout()" class="btn-logout">Вийти</button>
            } @else {
              <a routerLink="/login" class="nav-link">Увійти</a>
              <a routerLink="/register" class="nav-link btn-register">Реєстрація</a>
            }
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem 0;
      margin-bottom: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    .nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-link:hover {
      background-color: #34495e;
    }
    .btn-register {
      background-color: #27ae60;
    }
    .btn-logout {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .user-name {
      color: #3498db;
      font-weight: bold;
    }
  `]
})
export class HeaderComponent {
  private authService = inject(AuthService);
  
  isAuth$ = this.authService.isAuth$;
  currentUser$ = this.authService.currentUser$;
  
  onLogout(): void {
    this.authService.logout();
  }
}
