import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'user';
  
  private isAuthSubject$ = new BehaviorSubject<boolean>(this.hasToken());
  public isAuth$ = this.isAuthSubject$.asObservable();
  
  private currentUserSubject$ = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject$.asObservable();
  
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  
  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
  
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('login', credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this.isAuthSubject$.next(true);
          this.currentUserSubject$.next(response.user);
          this.toastr.success(`Вітаємо, ${response.user.name}!`, 'Успішний вхід');
          this.router.navigate(['/']);
        }),
        catchError(error => {
          this.toastr.error('Невірний логін або пароль', 'Помилка входу');
          return throwError(() => error);
        })
      );
  }
  
  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('register', credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this.isAuthSubject$.next(true);
          this.currentUserSubject$.next(response.user);
          this.toastr.success('Реєстрація успішна!', 'Вітаємо');
          this.router.navigate(['/']);
        }),
        catchError(error => {
          this.toastr.error('Не вдалося зареєструватися', 'Помилка реєстрації');
          return throwError(() => error);
        })
      );
  }
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthSubject$.next(false);
    this.currentUserSubject$.next(null);
    this.toastr.info('Ви вийшли з системи', 'До побачення');
    this.router.navigate(['/login']);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
