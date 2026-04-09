import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Вхід до системи</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.is-invalid]="email?.invalid && email?.touched"
            >
            <div class="invalid-feedback" *ngIf="email?.invalid && email?.touched">
              <span *ngIf="email?.errors?.['required']">Email обов'язковий</span>
              <span *ngIf="email?.errors?.['email']">Введіть коректний email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-control"
              [class.is-invalid]="password?.invalid && password?.touched"
            >
            <div class="invalid-feedback" *ngIf="password?.invalid && password?.touched">
              <span *ngIf="password?.errors?.['required']">Пароль обов'язковий</span>
              <span *ngIf="password?.errors?.['minlength']">Мінімум 6 символів</span>
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
            Увійти
          </button>
        </form>
        
        <p class="mt-3 text-center">
          Немає акаунту? <a routerLink="/register">Зареєструватися</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-control.is-invalid {
      border-color: #dc3545;
    }
    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .btn {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .mt-3 { margin-top: 1rem; }
    .text-center { text-align: center; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email: email!, password: password! }).subscribe();
    }
  }
}
