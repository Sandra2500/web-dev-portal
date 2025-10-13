import { Component } from '@angular/core';
import { ArticlesListComponent } from '../components/articles-list/articles-list';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  imports: [ArticlesListComponent]
})
export class LayoutComponent {
  title = 'WebDev Portal';
}