import { Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list';
import { ArticleFormComponent } from './components/article-form/article-form';
import { ArticleDetailComponent } from './components/article-detail/article-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'article/new', component: ArticleFormComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
];