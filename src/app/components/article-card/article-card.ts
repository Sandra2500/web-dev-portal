import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../shared/models/article.model';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { StatusColorPipe } from '../../shared/pipes/status-color.pipe';
import { HighlightDirective } from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
  imports: [CommonModule, TruncatePipe, StatusColorPipe, HighlightDirective],
  standalone: true
})
export class ArticleCardComponent {
  @Input() article!: Article;
}