import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../shared/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
  imports: [CommonModule]
})
export class ArticleCardComponent {
  @Input() article!: Article;
}