import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
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

  filteredItems: Item[] = this.items;
  searchTerm: string = '';

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredItems = this.items;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    }
  }

  onItemSelected(selectedItem: Item): void {
    console.log('🎯 Selected course:', selectedItem);
    console.log('Name:', selectedItem.name);
    console.log('Price:', selectedItem.price);
    console.log('Category:', selectedItem.category);
    
    alert(`Selected course: "${selectedItem.name}"\nPrice: ${selectedItem.price === 0 ? 'Free' : '$' + selectedItem.price}`);
  }

  getFeaturedCount(): number {
    return this.filteredItems.filter(item => item.isFeatured).length;
  }
}
