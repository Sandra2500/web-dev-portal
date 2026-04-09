import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  template: `
    <div class="app-container">
      <h1>Лабораторна робота №10</h1>
      <p>Взаємодія з сервером, HttpClient та Функціональні Інтерцептори</p>
      <app-product-list></app-product-list>
    </div>
  `,
  styles: [`
    .app-container { text-align: center; }
    h1 { color: #333; }
  `]
})
export class AppComponent {
  title = 'web-dev-app';
}
