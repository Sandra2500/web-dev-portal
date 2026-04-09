/// <reference types="cypress" />

describe('Authentication E2E Tests', () => {
  const testUser = {
    email: 'e2e-test@example.com',
    password: '123456',
    name: 'E2E Tester'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('/register');
      
      cy.get('input[formControlName="name"]').type(testUser.name);
      cy.get('input[formControlName="email"]').type(testUser.email);
      cy.get('input[formControlName="password"]').type(testUser.password);
      cy.get('input[formControlName="confirmPassword"]').type(testUser.password);
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/');
      cy.contains('Реєстрація успішна').should('be.visible');
    });
  });

  describe('Login', () => {
    it('should login successfully with correct credentials', () => {
      cy.visit('/login');
      
      cy.get('input[formControlName="email"]').type(testUser.email);
      cy.get('input[formControlName="password"]').type(testUser.password);
      
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/');
      cy.contains('Успішний вхід').should('be.visible');
    });

    it('should show error with invalid credentials', () => {
      cy.visit('/login');
      
      cy.get('input[formControlName="email"]').type('wrong@example.com');
      cy.get('input[formControlName="password"]').type('wrongpassword');
      
      cy.get('button[type="submit"]').click();
      
      cy.contains('Помилка входу').should('be.visible');
    });

    it('should show validation errors when fields are empty', () => {
      cy.visit('/login');
      
      cy.get('button[type="submit"]').click();
      
      cy.get('.invalid-feedback').should('be.visible');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[formControlName="email"]').type(testUser.email);
      cy.get('input[formControlName="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();
    });

    it('should logout successfully', () => {
      cy.contains('Вийти').click();
      cy.contains('Увійти').should('be.visible');
    });
  });
});
