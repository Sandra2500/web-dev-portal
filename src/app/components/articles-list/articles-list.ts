import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../shared/models/article.model';
import { ArticleCardComponent } from '../article-card/article-card';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.html',
  styleUrl: './articles-list.css',
  imports: [CommonModule, ArticleCardComponent]
})
export class ArticlesListComponent {
  articles: Article[] = [
    {
      id: 1,
      title: 'Основи Angular для початківців',
      description: 'Повний гайд по створенню першого додатку на Angular',
      content: 'Angular - це потужний фреймворк для створення клієнтських додатків...',
      author: 'WebDev Student',
      publishDate: new Date('2025-01-15'),
      category: 'Frontend',
      readTime: 10,
      tags: ['Angular', 'TypeScript', 'Початківцям']
    },
    {
      id: 2,
      title: 'Створення адаптивного дизайну',
      description: 'Як зробити сайт, який добре виглядає на всіх пристроях',
      content: 'Адаптивний дизайн - це підхід до веб-дизайну...',
      author: 'WebDev Student',
      publishDate: new Date('2025-01-20'),
      category: 'CSS',
      readTime: 8,
      tags: ['CSS', 'Responsive', 'Design']
    }
  ];
}