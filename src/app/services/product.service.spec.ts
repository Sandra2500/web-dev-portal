import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Item } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService
      ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data via GET request', () => {
    const mockItems: Item[] = [
      { id: '1', title: 'Test Item 1', category: 'Test', price: 100 },
      { id: '2', title: 'Test Item 2', category: 'Test', price: 200 }
    ];

    let loadedItems: Item[] = [];
    service.items$.subscribe(items => {
      loadedItems = items;
    });

    service.loadInitialData();

    const req = httpTestingController.expectOne('items');
    expect(req.request.method).toBe('GET');
    
    req.flush(mockItems);
    
    expect(loadedItems.length).toBe(2);
    expect(loadedItems[0].title).toBe('Test Item 1');
  });

  it('should add item via POST request', () => {
    const newItem = { title: 'New Item', category: 'New', price: 500 };
    const createdItem: Item = { id: '3', ...newItem };

    let addedItem: Item | null = null;
    service.items$.subscribe(items => {
      addedItem = items.find(i => i.id === '3') || null;
    });

    service.addItem(newItem);

    const req = httpTestingController.expectOne('items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newItem);
    
    req.flush(createdItem);
  });

  it('should delete item via DELETE request', () => {
    const itemId = '1';

    service.deleteItem(itemId);

    const req = httpTestingController.expectOne(`items/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    
    req.flush(null);
  });
});
