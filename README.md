# Proteinocean Cypress E2E Test Suite

[https://proteinocean.com](https://proteinocean.com) sitesi için Cypress ile yazılmış uçtan uca (E2E) test takımı.

## İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Test Çalıştırma](#test-çalıştırma)
- [Test Verileri (Statik)](#test-verileri-statik)
- [Klasör Yapısı](#klasör-yapısı)
- [Test Dosyaları](#test-dosyaları)
- [Notlar](#notlar)

---

## Proje Hakkında

Bu proje, bir e-ticaret sitesi olan **Proteinocean** üzerinde temel kullanıcı yolculuklarını otomatize eder:

- Üye girişi (login)
- Üye olma (register)
- Ana sayfa & navigasyon
- Arama
- Ürün listeleme ve filtreleme
- Ürün detay sayfası
- Sepet işlemleri

Toplam **8 test dosyası** vardır ve her dosya kendi içinde birden çok test case barındırır.

---

## Gereksinimler

- **Node.js** 18 veya üzeri
- **npm** (Node ile birlikte gelir)
- İnternet bağlantısı (testler canlı siteye karşı koşar)

---

## Kurulum

```bash
npm install
```

Bu komut Cypress'i ve tüm bağımlılıkları yükler.

---

## Test Çalıştırma

### Cypress UI (interaktif mod)

```bash
npm run cypress:open
```

Açılan pencereden **E2E Testing** → tarayıcı seç → istediğin spec dosyasına tıkla.

### Headless mod (tüm testler)

```bash
npm test
```

veya

```bash
npm run cypress:run
```

### Tek bir dosya çalıştırma

```bash
npm run test:login
npm run test:register
npm run test:homepage
npm run test:navigation
npm run test:search
npm run test:product-listing
npm run test:product-detail
npm run test:cart
```

---

## Test Verileri (Statik)

Test verileri [cypress.env.json](cypress.env.json) içinde tutulur. Testleri her çalıştırmadan önce gerekli alanları elle güncelleyebilirsin.

```json
{
  "loginEmail": "************",
  "loginPassword": "************",
  "registerFirstName": "************",
  "registerLastName": "************",
  "registerEmail": "************",
  "registerPassword": "************",
  "invalidEmail": "************",
  "invalidPassword": "************",
  "realAccountEmail": "************",
  "realAccountPassword": "************"
}
```

### Önemli — Register Testleri Hakkında

Register testi her başarılı çalışmada **yeni bir hesap oluşturur**. Site aynı e-posta ile ikinci kez kayıt olmana izin vermez. Bu yüzden register testini tekrar çalıştırmadan önce `cypress.env.json` dosyasındaki şu üç alanı güncelle:

- `registerFirstName` → `test2`, `test3`, ...
- `registerLastName` → `user2`, `user3`, ...
- `registerEmail` → `testuser_v2@gmail.com`, `testuser_v3@gmail.com`, ...

`registerPassword` ise statik kalır: `Testuser1?`

### Login Testi Hakkında

Login testi başarılı senaryoda `loginEmail` ve `loginPassword` değerlerini kullanır. Bu hesabın sistemde **önceden kayıtlı** olması gerekir. Eğer henüz yoksa, önce register testini bu bilgilerle çalıştır ya da `realAccountEmail` / `realAccountPassword` değerlerini test verisi olarak kullanmak için `cypress.env.json`'u düzenle.

---

## Klasör Yapısı

```
cypress-test/
├── cypress/
│   ├── e2e/                     # Test spec dosyaları (8 adet)
│   │   ├── 01-login.cy.js
│   │   ├── 02-register.cy.js
│   │   ├── 03-homepage.cy.js
│   │   ├── 04-navigation.cy.js
│   │   ├── 05-search.cy.js
│   │   ├── 06-product-listing.cy.js
│   │   ├── 07-product-detail.cy.js
│   │   └── 08-cart.cy.js
│   ├── fixtures/                # Test sabit verileri (JSON)
│   └── support/
│       ├── commands.js          # Custom Cypress komutları
│       └── e2e.js               # Global test setup
├── cypress.config.js            # Cypress konfigürasyonu
├── cypress.env.json             # Test verileri (kullanıcı/şifre)
├── package.json
├── README.md                    # Bu dosya
└── TEST_CASES.md                # Adım adım test senaryo dokümantasyonu
```

---

## Test Dosyaları

| # | Dosya | Kapsam |
|---|---|---|
| 01 | [01-login.cy.js](cypress/e2e/01-login.cy.js) | Geçersiz/eksik/geçerli giriş senaryoları |
| 02 | [02-register.cy.js](cypress/e2e/02-register.cy.js) | Kayıt formu validasyonu ve yeni üyelik |
| 03 | [03-homepage.cy.js](cypress/e2e/03-homepage.cy.js) | Ana sayfa öğelerinin kontrolü |
| 04 | [04-navigation.cy.js](cypress/e2e/04-navigation.cy.js) | Header / menü / footer navigasyonu |
| 05 | [05-search.cy.js](cypress/e2e/05-search.cy.js) | Arama fonksiyonu |
| 06 | [06-product-listing.cy.js](cypress/e2e/06-product-listing.cy.js) | Kategori sayfası, filtre, sıralama |
| 07 | [07-product-detail.cy.js](cypress/e2e/07-product-detail.cy.js) | Ürün detay sayfası ve sepete ekleme |
| 08 | [08-cart.cy.js](cypress/e2e/08-cart.cy.js) | Sepet ekle/sil/miktar/checkout flow başlangıcı |

Her dosyanın adım adım senaryosu için: **[TEST_CASES.md](TEST_CASES.md)**

---

## Notlar

- Site bir **ikas** SaaS e-ticaret platformu üzerinde çalışır (Next.js + Tailwind). Form input'larında çoğunlukla `name` / `id` attribute'u yoktur; testlerde label metni, placeholder veya type üzerinden seçim yapılır.
- `cypress.config.js` içinde `chromeWebSecurity: false` ayarı vardır; harici scriptler (ödeme, analytics) test akışını kesmez.
- Hata durumlarında ekran görüntüleri `cypress/screenshots/` altına otomatik kaydedilir.
- Canlı siteye karşı koştuğu için site geçici olarak yavaşladığında bazı testler `defaultCommandTimeout` (10 sn) içinde tamamlanamayabilir; gerekirse config'ten arttır.
