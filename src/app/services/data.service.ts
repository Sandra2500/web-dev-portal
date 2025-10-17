import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: Item[] = [
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

  getItems(): Item[] {
    return this.items;
  }

  searchItems(searchTerm: string): Item[] {
    if (!searchTerm.trim()) {
      return this.items;
    }
    
    const term = searchTerm.toLowerCase();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  }
}
