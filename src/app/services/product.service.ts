import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Item {
  id: string;
  title: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  
  private itemsSubject$ = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject$.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.http.get<Item[]>('items')
      .pipe(
        catchError((error) => {
          console.error('Error loading data:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          this.itemsSubject$.next(data);
        },
        error: (error) => console.error('Error loading data:', error)
      });
  }

  addItem(item: Omit<Item, 'id'>): void {
    this.http.post<Item>('items', item)
      .pipe(
        tap((newItem) => {
          const currentItems = this.itemsSubject$.getValue();
          this.itemsSubject$.next([...currentItems, newItem]);
        }),
        catchError((error) => {
          console.error('Error adding item:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  deleteItem(id: string): void {
    this.http.delete(`items/${id}`)
      .pipe(
        tap(() => {
          const currentItems = this.itemsSubject$.getValue();
          const updatedItems = currentItems.filter(item => item.id !== id);
          this.itemsSubject$.next(updatedItems);
        }),
        catchError((error) => {
          console.error('Error deleting item:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
