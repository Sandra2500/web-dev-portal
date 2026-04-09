import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Item } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Список товарів</h2>
      
      <div class="add-product-form">
        <h3>Додати новий товар</h3>
        <div class="form-group">
          <input #titleInput placeholder="Назва товару" class="form-control">
          <input #categoryInput placeholder="Категорія" class="form-control">
          <input #priceInput type="number" placeholder="Ціна" class="form-control">
          <button (click)="addProduct(titleInput.value, categoryInput.value, +priceInput.value)" 
                  class="btn btn-primary">
            Додати
          </button>
        </div>
      </div>

      <div class="products-grid">
        <div *ngFor="let item of products" class="product-card">
          <h3>{{ item.title }}</h3>
          <p>Категорія: {{ item.category }}</p>
          <p>Ціна: {{ item.price }} грн</p>
          <button (click)="deleteProduct(item.id)" class="btn btn-danger">
            Видалити
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .add-product-form { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .form-group { display: flex; gap: 10px; align-items: center; }
    .form-control { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .btn { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-danger { background-color: #dc3545; color: white; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .product-card { padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private toastr = inject(ToastrService);
  
  products: Item[] = [];

  ngOnInit() {
    this.productService.items$.subscribe(data => {
      this.products = data;
    });
  }

  addProduct(title: string, category: string, price: number) {
    if (!title || !category || !price) {
      this.toastr.warning('Заповніть всі поля', 'Увага');
      return;
    }
    
    this.productService.addItem({
      title,
      category,
      price
    });
    
    // Очистити поля
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach((input: any) => input.value = '');
  }

  deleteProduct(id: string) {
    this.productService.deleteItem(id);
  }
}
