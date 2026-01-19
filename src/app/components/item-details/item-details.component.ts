import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4" *ngIf="item; else notFound">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0">{{ item.name }}</h2>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>ID:</strong> {{ item.id }}</p>
              <p><strong>Категорія:</strong> {{ item.category || 'Не вказано' }}</p>
              <p><strong>Ціна:</strong> 
                <span class="badge bg-success fs-6">
                  {{ item.price | currency:'UAH':'symbol-narrow':'1.0-0' }}
                </span>
              </p>
            </div>
            <div class="col-md-6">
              <p><strong>Опис:</strong></p>
              <div class="p-3 bg-light rounded">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <a routerLink="/items" class="btn btn-secondary">
            ← Назад до списку
          </a>
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <div class="container mt-4">
        <div class="alert alert-warning">
          <h4 class="alert-heading">Товар не знайдено!</h4>
          <p>Товар з таким ID не існує.</p>
          <a routerLink="/items" class="btn btn-primary">
            Повернутися до списку товарів
          </a>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .card-header {
      background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
      padding: 1.5rem;
    }
    .bg-light {
      background-color: #f8f9fa !important;
      border-radius: 8px;
    }
    .btn-secondary {
      background-color: #6c757d;
      border-color: #6c757d;
    }
    .btn-secondary:hover {
      background-color: #5a6268;
      border-color: #545b62;
    }
    .badge {
      font-size: 1rem;
      padding: 0.5em 1em;
    }
  `]
})
export class ItemDetailsComponent implements OnInit {
  item: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => {
      this.item = item;
    });
  }
}
