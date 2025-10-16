import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent {
  items: Item[] = [
    {
      id: 1,
      name: 'HTML Tutorial',
      description: 'Learn HTML basics',
      price: 0,
      category: 'Frontend',
      isFeatured: true,
      inStock: true
    },
    {
      id: 2,
      name: 'CSS Mastery',
      description: 'Advanced CSS techniques',
      price: 29.99,
      category: 'Frontend',
      isFeatured: false,
      inStock: true
    },
    {
      id: 3,
      name: 'JavaScript Fundamentals',
      description: 'Core JavaScript concepts',
      price: 49.99,
      category: 'Frontend',
      isFeatured: true,
      inStock: false
    },
    {
      id: 4,
      name: 'Angular Framework',
      description: 'Complete Angular guide',
      price: 79.99,
      category: 'Framework',
      isFeatured: true,
      inStock: true
    },
    {
      id: 5,
      name: 'Node.js Backend',
      description: 'Server-side development',
      price: 59.99,
      category: 'Backend',
      isFeatured: false,
      inStock: true
    }
  ];

  getFeaturedCount(): number {
    return this.items.filter(item => item.isFeatured).length;
  }
}
