/// <reference types="cypress" />

export {};

describe('Компонент ExchangesList', () => {
    beforeEach(() => {
        // Перехватываем запрос на получение списка бирж
        cy.intercept('GET', '/exchanges').as('getExchanges');
        // Переходим на страницу списка бирж
        cy.visit('/exchanges');
    });

    it('должен загружать список бирж', () => {
        // Ждем, пока запрос завершится
        cy.wait('@getExchanges', { timeout: 10000 });

        // Увеличиваем тайм-аут поиска и проверяем, что список бирж отрисован
        cy.get('.exchanges-list', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });
});



