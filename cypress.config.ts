import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/components/__tests__/exchangesList.cy.ts',
    supportFile: false,
  },
});
