import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Item } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Список товарів</h2>
      
      <!-- Форма для додавання -->
      <div class="add-form">
        <h3>Додати новий товар</h3>
        <div class="form-group">
          <input [(ngModel)]="newItem.title" placeholder="Назва" class="form-control">
          <input [(ngModel)]="newItem.category" placeholder="Категорія" class="form-control">
          <input [(ngModel)]="newItem.price" type="number" placeholder="Ціна" class="form-control">
          <button (click)="addProduct()" class="btn btn-primary">Додати</button>
        </div>
      </div>
      
      <!-- Список товарів -->
      <div class="products-grid">
        <div *ngFor="let item of products" class="product-card">
          <h3>{{ item.title }}</h3>
          <p>Категорія: {{ item.category }}</p>
          <p>Ціна: {{ item.price }} грн</p>
          <button (click)="deleteProduct(item.id)" class="btn btn-danger">Видалити</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .add-form { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .form-group { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .form-control { padding: 8px; border: 1px solid #ddd; border-radius: 4px; flex: 1; }
    .btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-danger { background-color: #dc3545; color: white; margin-top: 10px; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .product-card { padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products: Item[] = [];
  
  newItem: Omit<Item, 'id'> = { title: '', category: '', price: 0 };

  ngOnInit() {
    this.productService.items$.subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    if (this.newItem.title && this.newItem.category && this.newItem.price > 0) {
      this.productService.addItem(this.newItem);
      this.newItem = { title: '', category: '', price: 0 };
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteItem(id);
  }
}
