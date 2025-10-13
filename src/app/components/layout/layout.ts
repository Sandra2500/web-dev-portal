import { Component } from '@angular/core';
import { ArticlesListComponent } from '../articles-list/articles-list';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  imports: [ArticlesListComponent]
})
export class Layout {
  title = 'WebDev Portal';
}