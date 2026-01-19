import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ItemCardComponent],
  template: `
    <div class="container mt-4">
      <h1 class="mb-4 text-primary">📦 Список товарів</h1>
      <p class="lead mb-4">Оберіть товар для перегляду детальної інформації</p>
      
      <div class="row">
        <div class="col-md-6 col-lg-4 mb-4" *ngFor="let item of items">
          <app-item-card [item]="item"></app-item-card>
        </div>
      </div>

      <div *ngIf="items.length === 0" class="alert alert-info">
        Товари не знайдено.
      </div>
    </div>
  `,
  styles: [`
    h1 {
      color: #343a40;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    .lead {
      color: #6c757d;
      font-size: 1.1rem;
    }
    .row {
      margin-top: 2rem;
    }
  `]
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }
}
