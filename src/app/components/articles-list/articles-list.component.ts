import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../shared/models/article';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css'
})
export class ArticlesListComponent {
  articles: Article[] = [
    {
      id: 1,
      title: 'Основи HTML та CSS',
      description: 'Вступ до веб-розробки: HTML структура та CSS стилі',
      content: 'Повний текст статті...',
      author: 'Іван Петренко',
      publishDate: new Date('2024-01-15'),
      category: 'Frontend',
      tags: ['HTML', 'CSS', 'Основи'],
      readTime: 5,
      imageUrl: '/assets/html-css.jpg'
    },
    {
      id: 2,
      title: 'JavaScript для початківців',
      description: 'Основи програмування на JavaScript',
      content: 'Повний текст статті...',
      author: 'Марія Коваль',
      publishDate: new Date('2024-01-20'),
      category: 'JavaScript',
      tags: ['JS', 'Програмування'],
      readTime: 8
    },
    {
      id: 3,
      title: 'Вступ до Angular',
      description: 'Створення SPA додатків з Angular',
      content: 'Повний текст статті...',
      author: 'Олексій Шевченко',
      publishDate: new Date('2024-02-01'),
      category: 'Frameworks',
      tags: ['Angular', 'TypeScript'],
      readTime: 10
    }
  ];
}