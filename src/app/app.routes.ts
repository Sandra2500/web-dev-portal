import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'product/new', 
    loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
