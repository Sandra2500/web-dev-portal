import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticleCardComponent } from '../article-card/article-card';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../shared/models/article.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  templateUrl: './articles-list.html',
  styleUrls: ['./articles-list.css']
})
export class ArticlesListComponent implements OnInit {
  articles$!: Observable<Article[]>; // Додайте $ для Observable
  
  constructor(private articleService: ArticleService) {}
  
  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles(); // Використовуйте getArticles()
  }
}