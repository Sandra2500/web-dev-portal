import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ВАЖЛИВО: додайте цей імпорт
import { Article } from '../shared/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesSubject = new BehaviorSubject<Article[]>([
    {
      id: 1,
      title: 'Основи Angular для початківців',
      description: 'Повний гайд по створенню першого додатку на Angular',
      content: 'Детальний зміст статті...',
      author: 'WebDev Student',
      publishDate: new Date('2025-01-15'),
      category: 'FRONTEND',
      readTime: 10,
      tags: ['Angular', 'TypeScript', 'Початківцям']
    },
    {
      id: 2,
      title: 'Створення адаптивного дизайну',
      description: 'Як зробити сайт, який добре виглядає на всіх пристроях',
      content: 'Детальний зміст статті...',
      author: 'WebDev Student',
      publishDate: new Date('2025-01-20'),
      category: 'CSS',
      readTime: 8,
      tags: ['CSS', 'Responsive', 'Design']
    }
  ]);

  articles$ = this.articlesSubject.asObservable();

  getArticles(): Observable<Article[]> {
    return this.articles$;
  }

  addArticle(newArticle: Omit<Article, 'id'>): void {
    const currentArticles = this.articlesSubject.getValue();
    const newId = Math.max(...currentArticles.map(a => a.id), 0) + 1;
    
    const articleToAdd: Article = {
      ...newArticle,
      id: newId
    };
    
    this.articlesSubject.next([...currentArticles, articleToAdd]);
  }

  getArticleById(id: number): Observable<Article | undefined> {
    return this.articles$.pipe(
      map((articles: Article[]) => articles.find(a => a.id === id)) // Додайте тип
    );
  }
}