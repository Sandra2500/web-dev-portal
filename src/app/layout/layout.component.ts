import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',  // ← оновити
  styleUrl: './layout.component.css'       // ← оновити
})
export class LayoutComponent {
  title = 'WebDev Portal';
}