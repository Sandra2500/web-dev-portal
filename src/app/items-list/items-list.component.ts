import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class ItemsListComponent implements OnInit, OnDestroy {
  filteredItems: Item[] = [];
  searchTerm: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.items$.subscribe(
      (items: Item[]) => this.filteredItems = items
    );
  }

  filterItems(): void {
    if (!this.searchTerm.trim()) {
      this.dataService.resetItems();
    } else {
      this.dataService.searchItems(this.searchTerm);
    }
  }

  onItemSelected(selectedItem: Item): void {
    console.log('Selected course:', selectedItem);
    alert(`Selected course: "${selectedItem.name}"`);
  }

  getFeaturedCount(): number {
    return this.filteredItems.filter(item => item.isFeatured).length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
