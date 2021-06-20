/// <reference types="cypress" />

context('Draw in different directions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  
  it('Should draw 4 boxes in 4 directions', () => {
    const canvas = cy.get("canvas");

    // Bottom-right direction
    canvas.trigger("mousedown", {x: 50, y: 50})
    canvas.trigger("mousemove", {x: 100, y: 100})
    canvas.trigger("mouseup");

    // Top-right direction
    canvas.trigger("mousedown", {x: 150, y: 100})
    canvas.trigger("mousemove", {x: 200, y: 50})
    canvas.trigger("mouseup");

    // Top-left direction
    canvas.trigger("mousedown", {x: 300, y: 150})
    canvas.trigger("mousemove", {x: 250, y: 100})
    canvas.trigger("mouseup");

    // Bottom-left direction
    canvas.trigger("mousedown", {x: 100, y: 200})
    canvas.trigger("mousemove", {x: 50, y: 250})
    canvas.trigger("mouseup");

    expect(cy.get("body").toMatchImageSnapshot());
  })
})
