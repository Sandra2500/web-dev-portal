import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Item } from '../models/item.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent implements OnInit {
  allItems: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allItems = this.dataService.getItems();
    this.filteredItems = this.allItems;
  }

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.dataService.searchItems(this.searchTerm);
    }
  }

  onItemSelected(selectedItem: Item): void {
    console.log('Selected course:', selectedItem);
    alert(`Selected course: "${selectedItem.name}"`);
  }

  getFeaturedCount(): number {
    return this.filteredItems.filter(item => item.isFeatured).length;
  }
}
