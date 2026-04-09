import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService, Item } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: '<div class="mock-card">{{ item.title }}</div>'
})
class MockProductCardComponent {
  @Input() item!: Item;
}

describe('ProductListComponent Integration', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  
  const mockItems: Item[] = [
    { id: '1', title: 'Integration Item 1', category: 'Test', price: 100 },
    { id: '2', title: 'Integration Item 2', category: 'Test', price: 200 },
    { id: '3', title: 'Integration Item 3', category: 'Test', price: 300 }
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['loadInitialData']);
    mockProductService.items$ = of(mockItems);
    
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    })
    .overrideComponent(ProductListComponent, {
      remove: { imports: [ProductListComponent] },
      add: { imports: [MockProductCardComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of product cards', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('.mock-card'));
    expect(cardElements.length).toBe(mockItems.length);
  });

  it('should display product titles in cards', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('.mock-card'));
    expect(cardElements[0].nativeElement.textContent).toContain('Integration Item 1');
    expect(cardElements[1].nativeElement.textContent).toContain('Integration Item 2');
    expect(cardElements[2].nativeElement.textContent).toContain('Integration Item 3');
  });

  it('should have products array with 3 items', () => {
    expect(component.products.length).toBe(3);
  });
});
