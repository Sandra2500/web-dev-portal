import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          <span class="badge bg-secondary">{{ item.category || 'Без категорії' }}</span>
        </h6>
        
        <p class="card-text">{{ item.description }}</p>
        
        <p class="card-text">
          <strong class="text-success">{{ item.price | currency:'UAH':'symbol-narrow':'1.0-0' }}</strong>
        </p>
        
        <!-- ЗАВДАННЯ: ЗАМІНИТИ КНОПКУ НА ПОСИЛАННЯ З routerLink -->
        <a [routerLink]="['/items', item.id]" class="btn btn-primary">
          Детальніше
        </a>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s, box-shadow 0.2s;
      height: 100%;
      border: 1px solid #e9ecef;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .card-title {
      color: #2c3e50;
      font-weight: 600;
    }
    .card-text {
      color: #6c757d;
      line-height: 1.5;
    }
    .badge {
      font-size: 0.75rem;
    }
    .btn-primary {
      background-color: #007bff;
      border-color: #007bff;
      transition: all 0.2s;
    }
    .btn-primary:hover {
      background-color: #0056b3;
      border-color: #0056b3;
      transform: scale(1.05);
    }
  `]
})
export class ItemCardComponent {
  @Input() item!: Item;
}
