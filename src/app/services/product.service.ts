import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  
  private itemsSubject$ = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject$.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.http.get<Item[]>('items')
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          this.toastr.error('Не вдалося завантажити дані з сервера', 'Помилка мережі');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Data loaded:', data);
          this.itemsSubject$.next(data);
          this.toastr.success('Дані успішно завантажено', 'Успіх');
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
          this.toastr.success('Елемент успішно додано!', 'Успіх');
        }),
        catchError((error) => {
          this.toastr.error('Не вдалося додати елемент', 'Помилка');
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
          this.toastr.info('Елемент видалено', 'Інфо');
        }),
        catchError((error) => {
          this.toastr.error('Не вдалося видалити елемент', 'Помилка');
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
