import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.html',
  styleUrl: './articles-list.css',
  imports: [CommonModule, ArticleCardComponent]
})
export class ArticlesListComponent {
  private readonly productsService = inject(ProductsService);
  readonly articles$ = this.productsService.items$;
}
