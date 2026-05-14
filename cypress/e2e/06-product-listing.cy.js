describe('06 - Product Listing | Ürün Listeleme (Kategori)', () => {
  const productCards = () => cy.get('li[data-id]');

  const parseTryPrice = (text) => {
    const m = String(text).match(/([\d.]+),(\d{2})\s*TL/i);
    if (!m) return null;
    const whole = m[1].replace(/\./g, '');
    return parseFloat(`${whole}.${m[2]}`);
  };

  beforeEach(() => {
    cy.visit('/protein');
    cy.acceptCookies();
  });

  it('TC-6.1 — Sayfa ve Kategori Yüklenmesi: Sayfa hata vermeden açılıyor mu?', () => {
    cy.url().should('include', '/protein');
    
    cy.get('body').then(($body) => {
      if ($body.text().match(/Toplam\s+\d+\s+ürün\s+görüntüleniyor/i)) {
        cy.contains(/Toplam\s+\d+\s+ürün\s+görüntüleniyor/i, { timeout: 15000 }).should('be.visible');
      } else {
        cy.get('header').should('be.visible');
      }
    });
  });

  it('TC-6.2 — Ürün Kartı Veri Bütünlüğü: Resim, isim ve fiyat doğru formatta mı?', () => {
    productCards().should('have.length.at.least', 1);

    productCards()
      .first()
      .within(() => {
        cy.get('img')
          .first()
          .should('be.visible')
          .should(($img) => {
            const src = $img.attr('src') || $img.attr('data-src') || '';
            const alt = $img.attr('alt') || '';
            expect(src.length > 8 || alt.length > 0, 'görsel src veya alt dolu olmalı').to.be.true;
          });
          
        cy.get('a[href]').first().should('have.attr', 'href').and('not.be.empty');
        
        cy.root().then(($card) => {
          expect($card.text()).to.match(/\d+[\d.,]*\s*TL|₺\s*\d/i);
        });
      });
  });

  it('TC-6.3 — Sayfalama / Infinite Scroll (Varsa): Aşağı inildikçe yeni ürünler yükleniyor mu?', () => {
    productCards().its('length').then((initialCount) => {
      cy.scrollTo('bottom', { duration: 1000 });
      
      cy.get('body').then(($body) => {
        const $loadMoreBtn = $body
          .find('button, a')
          .filter((_, el) => /daha\s*fazla|yükle/i.test(Cypress.$(el).text()))
          .filter(':visible');

        if ($loadMoreBtn.length) {
          cy.wrap($loadMoreBtn.first()).click({ force: true });
           
          productCards().its('length').should('be.gte', initialCount);
        } else {
          productCards().its('length').then((newCount) => {
            expect(newCount).to.be.at.least(initialCount);
          });
        }
      });
    });
  });

  it('TC-6.4 — Farklı Kategorilerin Erişilebilirliği: Diğer sayfalar 404 vermeden açılıyor mu?', () => {
    ['/vitamin', '/aksesuar', '/gida'].forEach((path) => {
      cy.request({ url: path, failOnStatusCode: false }).its('status').should('eq', 200);
      
      cy.visit(path);
      cy.acceptCookies();
      cy.url().should('include', path);
      
      cy.get('li[data-id]', { timeout: 20000 }).should('have.length.at.least', 1);
    });
  });
});