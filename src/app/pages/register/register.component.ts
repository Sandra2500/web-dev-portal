import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Реєстрація</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Ім'я</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              class="form-control"
              [class.is-invalid]="name?.invalid && name?.touched"
            >
            <div class="invalid-feedback" *ngIf="name?.invalid && name?.touched">
              <span *ngIf="name?.errors?.['required']">Ім'я обов'язкове</span>
              <span *ngIf="name?.errors?.['minlength']">Мінімум 2 символи</span>
            </div>
          </div>
          
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
          
          <div class="form-group">
            <label for="confirmPassword">Підтвердження пароля</label>
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="form-control"
              [class.is-invalid]="registerForm.errors?.['passwordMismatch'] && confirmPassword?.touched"
            >
            <div class="invalid-feedback" *ngIf="registerForm.errors?.['passwordMismatch'] && confirmPassword?.touched">
              Паролі не співпадають
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid">
            Зареєструватися
          </button>
        </form>
        
        <p class="mt-3 text-center">
          Вже є акаунт? <a routerLink="/login">Увійти</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .register-card {
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
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator });
  
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register({ name: name!, email: email!, password: password! }).subscribe();
    }
  }
}
