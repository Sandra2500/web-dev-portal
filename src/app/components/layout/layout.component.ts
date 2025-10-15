import { Component } from '@angular/core';
import { ArticlesListComponent } from '../articles-list/articles-list.component';  // ← виправити на .component

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ArticlesListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = 'WebDev Portal';
}