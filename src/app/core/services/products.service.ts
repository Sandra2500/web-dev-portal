import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../../shared/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);

  private readonly itemsSubject$ = new BehaviorSubject<Article[]>([]);
  readonly items$: Observable<Article[]> = this.itemsSubject$.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.http.get<Article[]>('items').pipe(
      tap((data) => this.itemsSubject$.next(data)),
      catchError(() => {
        this.toastr.error('Не вдалося з\'єднатися з сервером', 'Помилка мережі');
        this.itemsSubject$.next([]);
        return EMPTY;
      })
    ).subscribe();
  }

  addItem(item: Omit<Article, 'id'>): void {
    this.http.post<Article>('items', item).pipe(
      tap(() => {
        this.loadInitialData();
        this.toastr.success('Елемент успішно додано!', 'Успіх');
      }),
      catchError((error) => {
        this.toastr.error('Не вдалося з\'єднатися з сервером', 'Помилка мережі');
        return throwError(() => error);
      })
    ).subscribe();
  }

  deleteItem(id: number): void {
    this.http.delete(`items/${id}`).pipe(
      tap(() => {
        this.loadInitialData();
        this.toastr.info('Елемент видалено', 'Інфо');
      }),
      catchError((error) => {
        this.toastr.error('Не вдалося з\'єднатися з сервером', 'Помилка мережі');
        return throwError(() => error);
      })
    ).subscribe();
  }
}
