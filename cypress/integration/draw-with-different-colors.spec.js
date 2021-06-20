/// <reference types="cypress" />

context('Change color', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should draw boxes with different colors', () => {
    // Set color to red
    cy.get('.colorBoxButton[color=red]').click();

    // Red box in bottom-right direction
    cy.get('canvas').trigger('mousedown', { x: 50, y: 50 });
    cy.get('canvas').trigger('mousemove', { x: 100, y: 100 });
    cy.get('canvas').trigger('mouseup');

    // Set color to blue
    cy.get('.colorBoxButton[color=blue]').click();

    // Blue box in top-right direction
    cy.get('canvas').trigger('mousedown', { x: 150, y: 100 });
    cy.get('canvas').trigger('mousemove', { x: 200, y: 50 });
    cy.get('canvas').trigger('mouseup');

    // Set color to orange
    cy.get('.colorBoxButton[color=orange]').click();

    // Orange box in bottom-left direction
    cy.get('canvas').trigger('mousedown', { x: 100, y: 200 });
    cy.get('canvas').trigger('mousemove', { x: 50, y: 250 });
    cy.get('canvas').trigger('mouseup');

    expect(cy.get('body').toMatchImageSnapshot());
  });
});
