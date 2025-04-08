/// <reference types="cypress" />

export {};

describe('Компонент ExchangesList', () => {
    beforeEach(() => {
        cy.intercept('GET', '/exchanges').as('getExchanges');
        cy.visit('/exchanges');
    });

    it('должен загружать список бирж', () => {
        cy.wait('@getExchanges', { timeout: 10000 });

        // Увеличиние тайм-аут поиска и проверка, что список бирж отрисован
        cy.get('.exchanges-list', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });
});



