import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../shared/models/article';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() article!: Article;
}