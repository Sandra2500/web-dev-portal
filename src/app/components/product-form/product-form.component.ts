import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2>Додати новий товар</h2>
        
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Назва товару</label>
            <input
              type="text"
              id="title"
              formControlName="title"
              class="form-control"
              [class.is-invalid]="title?.invalid && title?.touched"
            >
            <div class="invalid-feedback" *ngIf="title?.invalid && title?.touched">
              <span *ngIf="title?.errors?.['required']">Назва обов'язкова</span>
              <span *ngIf="title?.errors?.['minlength']">Мінімум 3 символи</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="category">Категорія</label>
            <input
              type="text"
              id="category"
              formControlName="category"
              class="form-control"
              [class.is-invalid]="category?.invalid && category?.touched"
            >
            <div class="invalid-feedback" *ngIf="category?.invalid && category?.touched">
              <span *ngIf="category?.errors?.['required']">Категорія обов'язкова</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="price">Ціна (грн)</label>
            <input
              type="number"
              id="price"
              formControlName="price"
              class="form-control"
              [class.is-invalid]="price?.invalid && price?.touched"
            >
            <div class="invalid-feedback" *ngIf="price?.invalid && price?.touched">
              <span *ngIf="price?.errors?.['required']">Ціна обов'язкова</span>
              <span *ngIf="price?.errors?.['min']">Мінімальна ціна 0</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">Скасувати</button>
            <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid">
              Додати товар
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 500px;
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
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  `]
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]]
  });
  
  get title() { return this.productForm.get('title'); }
  get category() { return this.productForm.get('category'); }
  get price() { return this.productForm.get('price'); }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addItem(this.productForm.value as any);
      this.router.navigate(['/']);
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/']);
  }
}
