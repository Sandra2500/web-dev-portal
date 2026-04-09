/// <reference types="cypress" />

describe('Products E2E Tests', () => {
  const testUser = {
    email: 'e2e-test@example.com',
    password: '123456'
  };

  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type(testUser.email);
    cy.get('input[formControlName="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  it('should display product list', () => {
    cy.get('.product-card').should('have.length.at.least', 1);
  });

  it('should navigate to add product page', () => {
    cy.contains('Додати товар').click();
    cy.url().should('include', '/product/new');
  });

  it('should add new product', () => {
    cy.contains('Додати товар').click();
    
    cy.get('input[formControlName="title"]').type('Cypress Test Product');
    cy.get('input[formControlName="category"]').type('E2E Testing');
    cy.get('input[formControlName="price"]').type('999');
    
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/');
    cy.contains('Cypress Test Product').should('be.visible');
  });

  it('should delete product', () => {
    cy.contains('Cypress Test Product')
      .parent()
      .contains('Видалити')
      .click();
    
    cy.contains('Елемент видалено').should('be.visible');
  });
});
