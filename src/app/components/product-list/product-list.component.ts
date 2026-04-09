import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Item } from '../../services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Список товарів</h2>
      
      <div class="products-grid">
        <div *ngFor="let item of products" class="product-card">
          <h3>{{ item.title }}</h3>
          <p>Категорія: {{ item.category }}</p>
          <p>Ціна: {{ item.price }} грн</p>
          <button *ngIf="isAuthenticated" (click)="deleteProduct(item.id)" class="btn btn-danger">
            Видалити
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .product-card { padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; }
    .btn-danger { background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
    .btn-danger:hover { background-color: #c82333; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  
  products: Item[] = [];
  isAuthenticated = false;

  ngOnInit() {
    this.productService.items$.subscribe(data => {
      this.products = data;
    });
    
    this.authService.isAuth$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteItem(id);
  }
}
