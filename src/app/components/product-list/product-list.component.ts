import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Item } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="container">
      <h2>Список товарів</h2>
      <div class="products-grid">
        <app-product-card *ngFor="let item of products" [item]="item"></app-product-card>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products: Item[] = [];

  ngOnInit() {
    this.productService.items$.subscribe(data => {
      this.products = data;
    });
  }
}
