Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/account/login');
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').first().type(password);
  cy.contains('button', /giriş yap|giris yap/i).click();
});

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Kabul")').length) {
      cy.contains('button', /kabul/i).click({ force: true });
    }
  });
});

Cypress.Commands.add('clickAddToCartPdp', () => {
  cy.contains('button', /SEPETE EKLE/i).last().scrollIntoView().click({ force: true });
});
