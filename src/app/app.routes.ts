import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', loadComponent: () => import('./components/items-list/items-list.component').then(m => m.ItemsListComponent) },
  { path: 'items/:id', loadComponent: () => import('./components/item-details/item-details.component').then(m => m.ItemDetailsComponent) },
  { path: '**', redirectTo: '/items' }
];
