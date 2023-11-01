/// <reference types="cypress" />
import '../plugin'


describe('Static analysis background runner', () => {
  it('Renders second page and show more content on interaction', () => {
    cy.startAsyncAnalysis()

    cy.visit('https://www.w3.org/WAI/standards-guidelines/wcag/')

    cy.contains('How to Meet WCAG 2 (Quick Reference)')

    cy.visit('www.w3.org/WAI/WCAG21/quickref/')

    cy.contains('Expand all sections').click()

    cy.contains('Hide full description').should('be.visible')

    cy.contains('Collapse all sections').click()

    cy.contains('Expand all sections').should('be.visible')

    cy.visit('https://www.w3.org/WAI/standards-guidelines/wcag/')

    cy.stopAsyncAnalysis()
  })
})
