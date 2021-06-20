/// <reference types="cypress" />

context('Add color', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should add a new color', () => {
    // Set color to red
    cy.get('#addColorButton').click();
    cy.get('.colorBoxButton').should('have.length', 4);
  });
});
