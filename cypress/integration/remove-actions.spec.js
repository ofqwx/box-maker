/// <reference types="cypress" />

context('Remove actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should draw in different colors, remove and clear the board', () => {
    // Draw two boxes box
    cy.get('canvas').trigger('mousedown', { x: 50, y: 50 });
    cy.get('canvas').trigger('mousemove', { x: 250, y: 250 });
    cy.get('canvas').trigger('mouseup');

    // Set color to blue
    cy.get('.colorBoxButton[color=blue]').click();

    cy.get('canvas').trigger('mousedown', { x: 150, y: 100 });
    cy.get('canvas').trigger('mousemove', { x: 350, y: 300 });
    cy.get('canvas').trigger('mouseup');

    expect(cy.get('body').toMatchImageSnapshot());

    cy.get('button[type=switch]').then((buttons) => {
      // get the first user
      const removeButton = buttons[1];

      removeButton.click();

      // Click on interseccion box area should remove last box first.
      cy.get('canvas').click(200, 150);
      expect(cy.get('body').toMatchImageSnapshot());

      // Click on first box area should remove the box.
      cy.get('canvas').click(100, 100);
      expect(cy.get('body').toMatchImageSnapshot());
    });

    // Draw another box
    cy.get('canvas').trigger('mousedown', { x: 50, y: 50 });
    cy.get('canvas').trigger('mousemove', { x: 250, y: 250 });
    cy.get('canvas').trigger('mouseup');

    expect(cy.get('body').toMatchImageSnapshot());

    cy.get('.footer button').click();

    expect(cy.get('body').toMatchImageSnapshot());
  });
});
