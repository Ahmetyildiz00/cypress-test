# Proteinocean — Test Case Dokümantasyonu

Bu dosya, her test spec dosyasının içerdiği test senaryolarını **adım adım** açıklar. Her test case için:

- **Amaç** — ne doğrulanıyor?
- **Ön koşul** — başlamadan önce gerekli durum
- **Adımlar** — testin yaptığı işlemler
- **Beklenen sonuç** — başarılı sayılmak için gözlemlenmesi gereken durum

---

## İçindekiler

1. [01-login.cy.js — Giriş Yapma](#1-01-loginccyjs--giriş-yapma)
2. [02-register.cy.js — Üye Olma](#2-02-registerccyjs--üye-olma)
3. [03-homepage.cy.js — Ana Sayfa](#3-03-homepageccyjs--ana-sayfa)
4. [04-navigation.cy.js — Navigasyon](#4-04-navigationccyjs--navigasyon)
5. [05-search.cy.js — Arama](#5-05-searchccyjs--arama)
6. [06-product-listing.cy.js — Ürün Listeleme](#6-06-product-listingccyjs--ürün-listeleme)
7. [07-product-detail.cy.js — Ürün Detay](#7-07-product-detailccyjs--ürün-detay)
8. [08-cart.cy.js — Sepet](#8-08-cartccyjs--sepet)

---

## 1. 01-login.cy.js — Giriş Yapma

**Test edilen sayfa:** `/account/login`

### TC-1.1 — Boş form ile giriş denemesi

- **Amaç:** Form validasyonunun boş alanları yakalamasını doğrulamak
- **Ön koşul:** Login sayfası açık
- **Adımlar:**
  1. `/account/login` adresine git
  2. E-posta ve şifre alanlarına hiçbir şey yazma
  3. "GİRİŞ YAP" butonuna tıkla
- **Beklenen sonuç:**
  - URL hâlâ `/account/login` olmalı
  - Sayfada "Zorunlu" uyarısı görünür

### TC-1.2 — Geçersiz e-posta formatı ile giriş

- **Amaç:** E-posta input'unun HTML5 format validasyonunu kontrol etmek
- **Adımlar:**
  1. E-posta alanına `notanemail` yaz
  2. Şifre alanına `cypress.env.json.loginPassword` yaz
  3. "GİRİŞ YAP" butonuna bas
- **Beklenen sonuç:**
  - URL `/account/login` olarak kalır
  - E-posta input'u native validation kuralını ihlal eder (`checkValidity() === false`)

### TC-1.3 — Hatalı bilgiler ile giriş

- **Amaç:** Sistemin yanlış kimlik bilgilerini reddetmesini doğrulamak
- **Adımlar:**
  1. E-posta: `cypress.env.json.invalidEmail`
  2. Şifre: `cypress.env.json.invalidPassword`
  3. "GİRİŞ YAP" butonuna bas
- **Beklenen sonuç:**
  - URL `/account/login` olarak kalır
  - "Giriş başarısız" uyarı kutusu görünür

### TC-1.5 — Geçerli kimlik bilgileri ile başarılı giriş

- **Amaç:** Happy path girişin çalıştığını doğrulamak
- **Ön koşul:** `cypress.env.json.loginEmail` sistemde kayıtlı bir hesaba ait olmalı
- **Adımlar:**
  1. E-posta ve şifreyi env'den oku ve doldur
  2. "GİRİŞ YAP" butonuna bas
- **Beklenen sonuç:** URL artık `/account/login` içermez (yönlendirme gerçekleşti)

### TC-1.6 — "Şifremi Unuttum" linkinin çalışması

- **Amaç:** Şifre sıfırlama linkinin sayfa değişimini tetiklediğini doğrulamak
- **Adımlar:**
  1. Login sayfasında "Şifremi Unuttum" linkine tıkla
- **Beklenen sonuç:** URL `/account/login` dışına çıkar

---

## 2. 02-register.cy.js — Üye Olma

**Test edilen sayfa:** `/account/register`

> ⚠️ Her başarılı çalıştırmadan sonra `cypress.env.json` içindeki `registerEmail`, `registerFirstName`, `registerLastName` değerlerini elle güncellemek gerekir (v1 → v2 → ...). Aksi takdirde TC-2.6 sonraki run'da "e-posta zaten kayıtlı" hatası verir.

### TC-2.1 — Boş form ile kayıt denemesi

- **Adımlar:**
  1. `/account/register` aç
  2. Hiçbir alan doldurmadan "ÜYE OL" butonuna bas
- **Beklenen sonuç:**
  - URL `/account/register` olarak kalır
  - Sayfada "Zorunlu" uyarısı görünür

### TC-2.2 — Eksik alanlar ile kayıt (sadece e-posta dolu)

- **Adımlar:**
  1. Sadece E-Posta alanına `cypress.env.json.registerEmail` yaz
  2. "ÜYE OL" butonuna bas
- **Beklenen sonuç:**
  - URL `/account/register` olarak kalır
  - Boş alanlar için "Zorunlu" uyarısı görünür

### TC-2.4 — Zayıf şifre ile kayıt

- **Amaç:** Şifre minimum uzunluk kuralını doğrulamak (en az 6 karakter)
- **Adımlar:**
  1. Ad, Soyad, E-Posta env'den dolu
  2. Şifre: `123`
  3. "ÜYE OL" butonuna bas
- **Beklenen sonuç:**
  - URL `/account/register` olarak kalır
  - "En az 6 karakter olmalı" mesajı görünür

### TC-2.5 — KVKK / Üyelik sözleşmesi onayı verilmeden kayıt

- **Amaç:** Onay kutuları işaretlenmediğinde sitenin kayıt yapılmasını engellemesi gerektiğini doğrulamak
- **Adımlar:**
  1. Tüm alanları doğru doldur (env'den)
  2. Form içindeki tüm checkbox'ları `uncheck({ force: true })` ile temizle
  3. Hiçbir checkbox işaretli olmadığını doğrula
  4. "ÜYE OL" butonuna bas
  5. 3 saniye bekle (sunucu yanıtı için)
- **Beklenen sonuç:**
  - "Sözleşmeyi kabul / KVKK kabul / kabul etmelisiniz / zorunlu" benzeri uyarı görünür
  - Kayıt **tamamlanmaz**
- **Not:** Bu test mevcut sitenin **bug'ını yakalar**: site checkbox'lar boş olsa bile kaydı tamamlıyor. Bu durumda test, "Kayıt başarılı" görüldüğünde explicit olarak `throw new Error(...)` ile **fail eder**. Bug düzeltilirse test yeşil olur.

### TC-2.6 — Başarılı kayıt (happy path)

- **Ön koşul:** `cypress.env.json.registerEmail` sistemde mevcut DEĞİL (her run öncesi v sayısını arttır)
- **Adımlar:**
  1. Ad, Soyad, E-Posta, Şifre env'den dolu
  2. Checkbox'lar default işaretli (dokunulmaz)
  3. "ÜYE OL" butonuna bas
- **Beklenen sonuç:** "Kayıt başarılı" mesajı görünür

### TC-2.7 — Mevcut e-posta ile tekrar kayıt denemesi

- **Ön koşul:** TC-2.6 aynı çalıştırmada başarıyla tamamlanmış olmalı
- **Adımlar:**
  1. Aynı bilgilerle tekrar formu doldur ve gönder
- **Beklenen sonuç:** "Bu e-posta adresi sistemde kayıtlı" hatası görünür

---

## 3. 03-homepage.cy.js — Ana Sayfa

**Test edilen sayfa:** `/`

### TC-3.1 — Ana sayfanın başarıyla yüklenmesi

- **Adımlar:**
  1. `/` adresine git
- **Beklenen sonuç:**
  - `document.title` `proteinocean` regex'ine uyar
  - URL pathname `/`
  - Ana navigasyon (`nav.container-xl`) görünür

### TC-3.2 — Logonun görünür ve tıklanabilir olması

- **Adımlar:**
  1. `header a[href="/"]` elementini bul
  2. İçindeki `img[alt="proteinocean logo"]` görünür mü kontrol et
  3. Logoya tıkla
- **Beklenen sonuç:** Tıklamadan sonra URL pathname `/`

### TC-3.3 — Header butonlarının (Giriş Yap, Üye Ol, Arama, Sepet) görünmesi

- **Adımlar:**
  1. Header'da arama input'u (`input.personaclick-instant-search`) var mı?
  2. "SEPET" butonu görünür mü?
  3. "HESAP" butonuna focus ver; dropdown'da `/account/login` ve `/account/register` linkleri çıkmalı
- **Beklenen sonuç:** Tüm bu elementler görünür durumda

### TC-3.4 — Kampanya banner görünmesi

- **Adımlar:**
  1. `section[role="banner"]` elementini bul
- **Beklenen sonuç:** Görünür, "%20" metnini içerir ve "kampanya" veya "indirim" kelimelerinden birini içerir

### TC-3.5 — Kategori menüsünün tüm kategorileri listelemesi

- **Adımlar:**
  1. Ana nav içinde aşağıdaki 8 link `href` ile mevcut mu?
- **Kategoriler:** `/lansman`, `/paketler`, `/protein`, `/spor-gidalari`, `/vitamin`, `/saglik-1`, `/gida`, `/aksesuar`
- **Beklenen sonuç:** Hepsi görünür

### TC-3.6 — Footer linklerinin görünür ve geçerli href'lere sahip olması

- **Adımlar:**
  1. Footer'a scroll
  2. Footer içindeki tüm `a[href]` elementleri için href boş değil
- **Beklenen sonuç:** Her link string ve boşluk olmayan bir değere sahip

### TC-3.7 — Sosyal medya ikonlarının görünmesi

- **Adımlar:**
  1. Footer'da Facebook (`a[href*="facebook.com/proteinocean"]`), Instagram (`a[href*="instagram.com/proteinocean"]`) ve WhatsApp (`a[href*="wa.me"]`) linkleri var mı?
- **Beklenen sonuç:** Üçü de görünür

---

## 4. 04-navigation.cy.js — Navigasyon

### TC-4.1 — Protein kategorisine geçiş

- **Adımlar:**
  1. Ana navigasyondan `/protein` linkine tıkla
- **Beklenen sonuç:** URL pathname `/protein`

### TC-4.2 — Vitamin kategorisine geçiş

- **Adımlar:** Ana navigasyondan `/vitamin` linkine tıkla
- **Beklenen sonuç:** URL pathname `/vitamin`

### TC-4.3 — Spor Gıdaları kategorisine geçiş

- **Adımlar:** Ana navigasyondan `/spor-gidalari` linkine tıkla
- **Beklenen sonuç:** URL pathname `/spor-gidalari`

### TC-4.4 — Tüm ana kategorilerin geçerli URL'e gitmesi

- **Adımlar:**
  1. Her bir kategori için: ana sayfaya dön, navdan linke tıkla, URL'i doğrula
- **Kategoriler:** `/lansman`, `/paketler`, `/protein`, `/spor-gidalari`, `/vitamin`, `/saglik-1`, `/gida`, `/aksesuar`
- **Beklenen sonuç:** Her tıklamadan sonra ilgili kategori sayfası açılır

### TC-4.5 — Logoya tıklayarak ana sayfaya dönüş

- **Adımlar:**
  1. `/protein` sayfasına git
  2. `header a[href="/"]` (logoya) tıkla
- **Beklenen sonuç:** URL pathname `/`

### TC-4.6 — "Hakkımızda" sayfasına footer üzerinden geçiş

- **Adımlar:**
  1. Footer'a scroll
  2. Footer içindeki `a[href="/pages/hakkimizda"]` linkine tıkla
- **Beklenen sonuç:** URL pathname `/pages/hakkimizda`

### TC-4.7 — "İletişim" sayfasına geçiş

- **Adımlar:**
  1. Footer'da `a[href="/pages/iletisim"]` linkine tıkla
- **Beklenen sonuç:** URL pathname `/pages/iletisim`

### TC-4.8 — Browser geri/ileri butonlarının çalışması

- **Adımlar:**
  1. Ana sayfadan `/protein`'e git
  2. `cy.go('back')` ile geri dön
  3. `cy.go('forward')` ile ileri git
- **Beklenen sonuç:**
  - İlk tıklama sonrası `/protein`
  - Geri sonrası `/`
  - İleri sonrası `/protein`

---

## 5. 05-search.cy.js — Arama

> Selector'ler: input → `input.personaclick-instant-search` (visible filter), buton → `span` içinde "ARA" metni.

### TC-5.1 — Arama input'unun görünmesi ve placeholder kontrolü

- **Adımlar:**
  1. Ana sayfada arama input'unu bul
  2. `placeholder` attribute'unu oku
- **Beklenen sonuç:**
  - Input görünür
  - Placeholder "150" metnini içerir (örn. "150+'den fazla üründen ara")

### TC-5.2 — Pozitif arama: "Protein tozu"

- **Adımlar:**
  1. Arama alanına `Protein tozu` yaz, Enter'a bas
- **Beklenen sonuç:**
  - URL `/search` içerir veya `?s=`/`?q=` parametresi taşır
  - En az 1 ürün kartı (`li[data-id]` / `.product-item` / `.product-card`) görünür
  - Sonuç listesinde "protein" geçen bir element bulunur

### TC-5.3 — Autocomplete (öneri) listesi: ilk 3 harf "kre"

- **Adımlar:**
  1. Arama alanına `kre` yaz (150 ms type delay)
- **Beklenen sonuç:**
  - Öneri paneli (`personaclick` / `instant-search` / `role="listbox"` class'lı element) görünür
  - "kreatin" veya "creatine" metni görünür

### TC-5.4 — Negatif arama: anlamsız karakter "xyz123"

- **Adımlar:**
  1. Arama alanına `xyz123` yaz, Enter
- **Beklenen sonuç:**
  - URL arama sonuç sayfası
  - "Hiç ürün bulunamadı / sonuç bulunamadı / 0 ürün / ürün bulunamadı" mesajı görünür

---

## 6. 06-product-listing.cy.js — Ürün Listeleme (Kategori Sayfası)

**Test edilen sayfa:** `/protein` (örnek kategori)
**Ürün kartı selector'ı:** `li[data-id]`

### TC-6.1 — Sayfa ve Kategori Yüklenmesi

- **Amaç:** Sayfa hata vermeden açılıyor mu?
- **Adımlar:**
  1. `/protein` adresine git
- **Beklenen sonuç:**
  - URL `/protein` içerir
  - "Toplam X ürün görüntüleniyor" metni varsa görünür, yoksa header görünür olmalı

### TC-6.2 — Ürün Kartı Veri Bütünlüğü

- **Amaç:** Resim, isim ve fiyat doğru formatta mı?
- **Adımlar:**
  1. İlk ürün kartını seç
  2. Görselin `src` veya `alt` değerini kontrol et
  3. Kart içindeki ilk `a[href]` boş olmamalı
  4. Kartın text içeriği fiyat formatına (`\d+TL` veya `₺\d`) uymalı
- **Beklenen sonuç:** Hepsi geçerli

### TC-6.3 — Sayfalama / Infinite Scroll

- **Amaç:** Aşağı inildikçe yeni ürünler yükleniyor mu?
- **Adımlar:**
  1. Mevcut ürün sayısını oku
  2. Sayfayı sona kadar scroll et
  3. "Daha Fazla" / "Yükle" benzeri buton varsa tıkla
- **Beklenen sonuç:** Ürün sayısı azalmadı (eşit veya artmış olmalı)

### TC-6.4 — Farklı kategorilerin erişilebilirliği

- **Adımlar:**
  1. `/vitamin`, `/aksesuar`, `/gida` için sırayla:
     - `cy.request` ile status 200
     - `cy.visit` ile sayfa yüklemesi
     - En az 1 `li[data-id]` ürün kartı görünmesi
- **Beklenen sonuç:** Tüm kategoriler 200 status ve en az 1 ürün kartı ile açılır

---

## 7. 07-product-detail.cy.js — Ürün Detay

**Test ürünü:** `/whey-protein`

### TC-7.1 — Bir ürün detay sayfasının yüklenmesi

- **Adımlar:**
  1. `/protein` kategorisine git
  2. "whey protein" metnini içeren ilk görünür linke tıkla
- **Beklenen sonuç:**
  - URL pathname `/whey-protein`
  - `h1.product-title` içinde "whey" metni var
  - "SEPETE EKLE" butonu DOM'da mevcut

### TC-7.2 — Aroma / varyant seçimi

- **Ön koşul:** `/whey-protein` sayfası açık
- **Adımlar:**
  1. "Chocolate & Hazelnut" varyantına tıkla (`[role="button"][aria-pressed]`)
- **Beklenen sonuç:**
  - "Chocolate & Hazelnut" elementi `aria-pressed="true"`
  - "Çikolata" elementi `aria-pressed="false"` (yani seçim değişti)

### TC-7.3 — Miktar arttırma / azaltma butonları

- **Adımlar:**
  1. `input[type="number"]` veya `[role="spinbutton"]` ile miktar alanını bul
  2. Default değer `1` olmalı
  3. `+` butonuna bas → değer `2` olmalı
  4. `-` butonuna bas → değer `1` olmalı
- **Beklenen sonuç:** Sayı 1 → 2 → 1 olarak değişir

### TC-7.4 — "Sepete Ekle" ile ürünü sepete ekleme

- **Adımlar:**
  1. `cy.clickAddToCartPdp()` custom komutu ile sepete ekle
  2. "SEPETE EKLE" butonu disabled olmaktan çıkana kadar bekle (max 20 s)
  3. `/cart` sayfasına git
- **Beklenen sonuç:**
  - URL pathname `/cart`
  - Sepette `a[href*="/whey-protein"]` linki en az 1 adet var
  - Body text içinde "TOPLAM" ve "TL" geçer

---

## 8. 08-cart.cy.js — Sepet

**Viewport:** `1920x1080` (sepet sayfası geniş ekran için optimize)

> Her test başında `clearAllLocalStorage` ve `clearCookies` ile sepet/oturum sıfırlanır. `addWheyFromPdp` helper'ı `/whey-protein` üzerinden bir ürünü sepete ekler.

### TC-8.1 — Boş sepet ile sepet sayfasının açılması

- **Adımlar:**
  1. Sepeti sıfırla
  2. `/cart` sayfasına git
- **Beklenen sonuç:**
  - URL pathname `/cart`
  - "ALIŞVERİŞE BAŞLA" butonu görünür (boş sepet ekranı)

### TC-8.2 — Sepete ürün eklendikten sonra sepet sayfası

- **Adımlar:**
  1. Sepeti sıfırla
  2. `/whey-protein` üzerinden ürünü sepete ekle
  3. `/cart` sayfasına git
- **Beklenen sonuç:**
  - Sepette `a[href*="/whey-protein"]` linki en az 1 adet
  - Body içinde "TOPLAM" ve "TL" geçer

### TC-8.3 — Sepet içinde ürün miktarını arttırma

- **Adımlar:**
  1. Sepeti sıfırla, whey ürünü ekle, `/cart`'a git
  2. Miktar input'unun değeri `1` olmalı
  3. Aynı satırdaki `+` butonuna tıkla
- **Beklenen sonuç:** Miktar `2` olur

### TC-8.4 — Sepet içinde ürün miktarını azaltma

- **Adımlar:**
  1. Sepeti sıfırla, whey ürünü ekle, `/cart`'a git
  2. Önce `+` ile miktarı `2` yap
  3. Sonra `-` ile geri `1` yap
- **Beklenen sonuç:** Miktar sırayla 1 → 2 → 1

### TC-8.5 — Sepetten ürün silme

- **Adımlar:**
  1. Sepeti sıfırla, whey ürünü ekle, `/cart`'a git
  2. Whey ürün satırını bul (`a[href*="/whey-protein"]` parent)
  3. Aria-label / title / sadece icon barındıran buton ile sil
- **Beklenen sonuç:** "ALIŞVERİŞE BAŞLA" butonu görünür (sepet boş hâle gelmiş)

### TC-8.6 — Geçersiz promosyon kodu girişi

- **Adımlar:**
  1. Sepeti sıfırla, whey ürünü ekle, `/cart`'a git
  2. "Promosyon Kodu" alanını bul, gerekirse aç
  3. İlgili input'a `INVALIDCODE123` yaz
  4. "Uygula / Kullan / Onayla" benzeri butona tıkla
- **Beklenen sonuç:** "Geçersiz / bulunamadı / hatalı / uygulanamadı / tanımsız / kullanılamaz / invalid / uygun değil" benzeri mesaj görünür

### TC-8.7 — "DEVAM ET" butonunun çalışması

- **Adımlar:**
  1. Sepeti sıfırla, whey ürünü ekle, `/cart`'a git
  2. "DEVAM ET" butonuna tıkla
- **Beklenen sonuç:** URL'in pathname'i `checkout / odeme / ödeme / payment / login / account / verify / siparis / sipariş` regex'lerinden birine uyar

### TC-8.8 — Birden fazla farklı ürünü sepete ekleme

- **Adımlar:**
  1. Sepeti sıfırla
  2. `/whey-protein` üzerinden whey'i sepete ekle
  3. `/creatine` üzerinden creatine'i sepete ekle
  4. `/cart`'a git
- **Beklenen sonuç:**
  - Sepette hem `a[href*="/whey-protein"]` hem `a[href*="/creatine"]` linki en az 1 adet
  - Body içinde "TOPLAM" ve "TL" geçer

---
