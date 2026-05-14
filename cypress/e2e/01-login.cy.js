describe('01 - Login | Giriş Yapma', () => {
  const emailInput = () => cy.get('input[type="email"]');
  const passwordInput = () => cy.get('input[type="password"]');
  const submitButton = () =>
    cy.contains('button', "GİRİŞ YAP");

  beforeEach(() => {
    cy.visit('/account/login');
  });

  it('TC-1.1 — Boş form ile giriş denemesi', () => {
    submitButton().click();

    cy.url().should('include', '/account/login');
    cy.contains('Zorunlu').should('be.visible');
  });

  it('TC-1.2 — Geçersiz e-posta formatı ile giriş', () => {
    emailInput().type('notanemail');
    passwordInput().type(Cypress.env('loginPassword'));
    submitButton().click();

    cy.url().should('include', '/account/login');

    emailInput().then(($el) => {
      const el = $el[0];
      expect(el.checkValidity()).to.equal(false);
      expect(el.validationMessage).to.not.be.empty;
    });
  });

  it('TC-1.3 — Hatalı bilgiler ile giriş', () => {
    emailInput().type(Cypress.env('invalidEmail'));
    passwordInput().type(Cypress.env('invalidPassword'));
    submitButton().click();

    cy.url().should('include', '/account/login');
    cy.contains('Giriş başarısız', { timeout: 10000 }).should('be.visible');
  });

  it('TC-1.4 — Geçerli kimlik bilgileri ile başarılı giriş', () => {
    emailInput().type(Cypress.env('loginEmail'));
    passwordInput().type(Cypress.env('loginPassword'));
    submitButton().click();

    cy.url({ timeout: 15000 }).should('not.include', '/account/login');
  });

  it('TC-1.5 — "Şifremi Unuttum" linkinin çalışması', () => {
    cy.contains(/şifremi unuttum/i).click();

    cy.url().should('not.include', '/account/login');
  });
});
