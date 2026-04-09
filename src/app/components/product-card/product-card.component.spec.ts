import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent, ProductCardItem } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  
  const mockItem: ProductCardItem = {
    id: '1',
    title: 'Тестовий товар',
    category: 'Тестування',
    price: 999
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item title in h3', () => {
    const h3Element: HTMLElement = fixture.nativeElement.querySelector('.card-title');
    expect(h3Element.textContent).toContain(mockItem.title);
  });

  it('should display item category', () => {
    const categoryElement: HTMLElement = fixture.nativeElement.querySelector('.card-category');
    expect(categoryElement.textContent).toContain(mockItem.category);
  });

  it('should display item price', () => {
    const priceElement: HTMLElement = fixture.nativeElement.querySelector('.card-price');
    expect(priceElement.textContent).toContain(mockItem.price.toString());
  });

  it('should truncate long title', () => {
    const longTitle = 'Це дуже довга назва товару яка має бути обрізана';
    component.item = { ...mockItem, title: longTitle };
    fixture.detectChanges();
    
    const h3Element: HTMLElement = fixture.nativeElement.querySelector('.card-title');
    expect(h3Element.textContent?.length).toBeLessThan(longTitle.length);
  });
});
