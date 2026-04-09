import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

export interface ProductCardItem {
  id: string;
  title: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  template: `
    <div class="card">
      <h3 class="card-title">{{ item.title | truncate:30 }}</h3>
      <p class="card-category">Категорія: {{ item.category }}</p>
      <p class="card-price">Ціна: {{ item.price }} грн</p>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-title {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
    }
    .card-category {
      color: #666;
      margin: 4px 0;
    }
    .card-price {
      font-weight: bold;
      color: #007bff;
      margin: 8px 0 0 0;
    }
  `]
})
export class ProductCardComponent {
  @Input() item!: ProductCardItem;
}
