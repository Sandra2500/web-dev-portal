import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() itemSelected = new EventEmitter<Item>();

  onSelectItem(): void {
    this.itemSelected.emit(this.item);
  }
}
