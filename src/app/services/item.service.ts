import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [
    { id: 1, name: 'Ноутбук', description: 'Потужний ноутбук для роботи та ігор', price: 25000, category: 'Електроніка' },
    { id: 2, name: 'Смартфон', description: 'Смартфон з гарною камерою та великим екраном', price: 15000, category: 'Електроніка' },
    { id: 3, name: 'Книга', description: 'Цікава книга для читання у вільний час', price: 300, category: 'Книги' },
    { id: 4, name: 'Навушники', description: 'Бездротові навушники з шумозаглушенням', price: 2000, category: 'Електроніка' },
    { id: 5, name: 'Мишка', description: 'Геймерська мишка з підсвічуванням', price: 800, category: 'Аксесуари' }
  ];

  getItems(): Observable<Item[]> {
    return of(this.items);
  }

  getItem(id: number): Observable<Item | undefined> {
    const item = this.items.find(item => item.id === id);
    return of(item);
  }
}
