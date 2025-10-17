import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items-list/items-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: ItemsListComponent }
    ]
  }
];
