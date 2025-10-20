import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';

export const routes: Routes = [
  { path: 'courses', component: ItemsListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];
