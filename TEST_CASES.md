# Proteinocean — Test Case Dokümantasyonu

Bu dosya, her test spec dosyasının içerdiği test senaryolarını **adım adım** açıklar. Her test case için:

- **Amaç** — ne doğrulanıyor?
- **Ön koşul** — başlamadan önce gerekli durum
- **Adımlar** — kullanıcının yaptığı işlemler
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
- **Ön koşul:** Login sayfası açık, kullanıcı çıkış yapmış durumda
- **Adımlar:**
  1. `/account/login` adresine git
  2. E-posta ve şifre alanlarına hiçbir şey yazma
  3. "Giriş Yap" butonuna tıkla
- **Beklenen sonuç:**
  - Form gönderilmez, sayfa URL'i değişmez
  - Boş alanlar için HTML5 ya da uygulama tarafı validasyon mesajı görünür

### TC-1.2 — Geçersiz e-posta formatı ile giriş

- **Amaç:** E-posta input'unun format validasyonunu kontrol etmek
- **Ön koşul:** Login sayfası açık
- **Adımlar:**
  1. E-posta alanına `notanemail` yaz
  2. Şifre alanına `Testuser1?` yaz
  3. "Giriş Yap" butonuna bas
- **Beklenen sonuç:**
  - Form gönderilmez veya "geçersiz e-posta" mesajı görünür
  - URL hâlâ `/account/login` olmalı

### TC-1.3 — Hatalı bilgiler ile giriş

- **Amaç:** Sistemin yanlış kimlik bilgilerini reddetmesini doğrulamak
- **Ön koşul:** Login sayfası açık
- **Adımlar:**
  1. E-posta: `wrong_user@gmail.com`
  2. Şifre: `WrongPass123?`
  3. "Giriş Yap" butonuna bas
- **Beklenen sonuç:**
  - Hata mesajı görünür (örn. "E-posta veya şifre hatalı")
  - Kullanıcı giriş yapamaz, login sayfasında kalır

### TC-1.5 — Geçerli kimlik bilgileri ile başarılı giriş

- **Amaç:** Mutluluk yolunun (happy path) çalıştığını doğrulamak
- **Ön koşul:** `cypress.env.json` içindeki `loginEmail` ve `loginPassword` sistemde kayıtlı
- **Adımlar:**
  1. E-posta ve şifreyi `cypress.env.json` değerleri ile doldur
  2. "Giriş Yap" butonuna bas
- **Beklenen sonuç:**
  - Başarılı yönlendirme (ana sayfaya veya hesap sayfasına)
  - Header üzerinde "Hesabım" / kullanıcı menüsü görünür hâle gelir

### TC-1.6 — "Şifremi Unuttum" linkinin çalışması

- **Amaç:** Şifre sıfırlama linkinin doğru sayfaya götürdüğünü doğrulamak
- **Adımlar:**
  1. Login sayfasında "Şifremi Unuttum" linkine tıkla
- **Beklenen sonuç:** Şifre sıfırlama sayfasına yönlendirilir

---

## 2. 02-register.cy.js — Üye Olma

**Test edilen sayfa:** `/account/register`


### TC-2.1 — Boş form ile kayıt denemesi

- **Adımlar:**
  1. `/account/register` aç
  2. Hiçbir alanı doldurmadan "Üye Ol" butonuna bas
- **Beklenen sonuç:** Form gönderilmez, zorunlu alan validasyon mesajları görünür

### TC-2.2 — Eksik alanlar ile kayıt (sadece e-posta doldurulmuş)

- **Adımlar:**
  1. Ad, Soyad, Şifre alanlarını boş bırak
  2. E-posta: `testuser_v1@gmail.com`
  3. "Üye Ol" butonuna bas
- **Beklenen sonuç:** Eksik alanlar için uyarı görünür, form gönderilmez

### TC-2.3 — Geçersiz e-posta formatı

- **Adımlar:**
  1. Ad: `test1`, Soyad: `user1`, Şifre: `Testuser1?`
  2. E-posta: `bad-email-format`
  3. "Üye Ol" butonuna bas
- **Beklenen sonuç:** Geçersiz e-posta mesajı görünür

### TC-2.4 — Zayıf şifre ile kayıt

- **Amaç:** Sistemin minimum şifre güvenlik kuralını uyguladığını test etmek
- **Adımlar:**
  1. Ad, Soyad, E-posta dolu
  2. Şifre: `123`
  3. "Üye Ol" butonuna bas
- **Beklenen sonuç:** Şifre kuralı ihlali mesajı görünür (eğer kural varsa)

### TC-2.5 — KVKK / Üyelik sözleşmesi onayı verilmeden kayıt

- **Adımlar:**
  1. Tüm alanları doğru doldur
  2. KVKK / Üyelik sözleşmesi checkbox'ını işaretleme (eğer default işaretliyse, kaldır)
  3. "Üye Ol" butonuna bas
- **Beklenen sonuç:** "Sözleşmeyi kabul etmelisiniz" uyarısı görünür, kayıt tamamlanmaz

### TC-2.6 — Başarılı kayıt (happy path)

- **Ön koşul:** `cypress.env.json` içindeki `registerEmail` bu çalıştırmaya özgü ve sistemde mevcut DEĞİL
- **Adımlar:**
  1. Ad: `cypress.env.json.registerFirstName`
  2. Soyad: `cypress.env.json.registerLastName`
  3. E-posta: `cypress.env.json.registerEmail`
  4. Şifre: `cypress.env.json.registerPassword` (`Testuser1?`)
  5. KVKK ve sözleşme checkbox'larını işaretle
  6. "Üye Ol" butonuna bas
- **Beklenen sonuç:**
  - Hesap oluşturulur
  - Kullanıcı otomatik giriş yapar veya başarı mesajı görür
  - Header'da kullanıcı menüsü görünür hâle gelir

### TC-2.7 — Mevcut e-posta ile tekrar kayıt denemesi

- **Ön koşul:** TC-2.6 başarıyla tamamlanmış olmalı
- **Adımlar:**
  1. Aynı bilgilerle tekrar kayıt olmayı dene
- **Beklenen sonuç:** "Bu e-posta zaten kayıtlı" benzeri hata mesajı görünür

---

## 3. 03-homepage.cy.js — Ana Sayfa

**Test edilen sayfa:** `/`

### TC-3.1 — Ana sayfanın başarıyla yüklenmesi

- **Adımlar:**
  1. `/` adresine git
- **Beklenen sonuç:**
  - Status 200, sayfa içeriği render olur
  - `document.title` Proteinocean ile alakalı olmalı

### TC-3.2 — Logonun görünür ve tıklanabilir olması

- **Adımlar:**
  1. Header'daki logoyu kontrol et
  2. Logoya tıkla
- **Beklenen sonuç:** Logo görünür, tıklayınca `/` adresine gider

### TC-3.3 — Header'daki ana butonların (Giriş Yap, Üye Ol, Arama, Sepet) görünmesi

- **Adımlar:**
  1. Header alanını incele
- **Beklenen sonuç:** Aşağıdaki linkler/butonlar görünür:
  - "Giriş Yap" — href `/account/login`
  - "Üye Ol" — href `/account/register`
  - Arama input/butonu
  - Sepet ikonu

### TC-3.4 — Kampanya banner'ının görünmesi

- **Adımlar:**
  1. Sayfanın üst kısmındaki kampanya banner alanını kontrol et
- **Beklenen sonuç:** %20 indirim veya aktif kampanya banner'ı render edilir

### TC-3.5 — Kategori menüsünün tüm kategorileri listelemesi

- **Adımlar:**
  1. Üst menü kategorilerini sırayla doğrula
- **Beklenen sonuç:** Aşağıdaki kategoriler menüde görünür:
  - Lansman, Paketler, Protein, Spor Gıdaları, Vitamin, Sağlık, Gıda, Aksesuar

### TC-3.6 — Footer linklerinin görünür ve geçerli href'lere sahip olması

- **Adımlar:**
  1. Footer alanına scroll yap
  2. Şirket, KVKK, SSS, İletişim vb. linkleri incele
- **Beklenen sonuç:** Footer linkleri görünür ve href'leri boş değil

### TC-3.7 — Sosyal medya ikonlarının görünmesi

- **Adımlar:**
  1. Footer'daki Facebook / Instagram / WhatsApp linklerini incele
- **Beklenen sonuç:** İkonlar görünür, target `_blank` veya geçerli URL'e sahip

---

## 4. 04-navigation.cy.js — Navigasyon

### TC-4.1 — Protein kategorisine geçiş

- **Adımlar:**
  1. Ana sayfada "Protein" menü öğesine tıkla
- **Beklenen sonuç:** URL `/protein` olur, kategori sayfası açılır

### TC-4.2 — Vitamin kategorisine geçiş

- **Adımlar:**
  1. "Vitamin" menüsüne tıkla
- **Beklenen sonuç:** URL `/vitamin` olur

### TC-4.3 — Spor Gıdaları kategorisine geçiş

- **Adımlar:**
  1. "Spor Gıdaları" menüsüne tıkla
- **Beklenen sonuç:** URL `/spor-gidalari` olur

### TC-4.4 — Tüm ana kategorilerin geçerli URL'e gitmesi

- **Adımlar:**
  1. Tüm kategori menü öğelerini sırayla tıkla ve URL'i doğrula
- **Beklenen sonuç:** Her tıklamadan sonra ilgili kategori sayfası açılır (200 status)

### TC-4.5 — Logoya tıklayarak ana sayfaya dönüş

- **Ön koşul:** Bir kategori sayfasında olmak
- **Adımlar:**
  1. Logoya tıkla
- **Beklenen sonuç:** URL `/` olur

### TC-4.6 — "Hakkımızda" sayfasına footer üzerinden geçiş

- **Adımlar:**
  1. Footer'dan "Hakkımızda" linkine tıkla
- **Beklenen sonuç:** `/pages/hakkimizda` sayfası açılır, içerik render olur

### TC-4.7 — "İletişim" sayfasına geçiş

- **Adımlar:**
  1. Footer'dan "İletişim" linkine tıkla
- **Beklenen sonuç:** `/pages/iletisim` sayfası açılır

### TC-4.8 — Browser'ın geri/ileri butonlarının çalışması

- **Adımlar:**
  1. Ana sayfa → Protein kategorisi → Geri butonu
- **Beklenen sonuç:** Tekrar ana sayfaya döner

---

## 5. 05-search.cy.js — Arama

### TC-5.1 — Arama input'unun görünmesi

- **Adımlar:**
  1. Ana sayfada arama input alanını incele
- **Beklenen sonuç:** Placeholder "150+'den fazla üründen ara" benzeri, input görünür

### TC-5.3 — Geçerli bir ürün adı ile arama ("whey")

- **Adımlar:**
  1. Arama alanına `whey` yaz
  2. Enter'a bas veya "ARA" butonuna tıkla
- **Beklenen sonuç:**
  - Arama sonuç sayfasına yönlendirilir
  - Sonuçlarda `whey` içeren en az 1 ürün listelenir

### TC-5.4 — Anlık (instant) arama önerilerinin görünmesi

- **Adımlar:**
  1. Arama alanına `pro` harf harf yaz
- **Beklenen sonuç:** Dropdown / panel olarak öneri ürünleri görünür (PersonaClick instant search)

### TC-5.5 — Eşleşmeyen kelime ile arama

- **Adımlar:**
  1. Arama alanına `xyznosuchproduct1234` yaz
  2. Aramayı gönder
- **Beklenen sonuç:** "Sonuç bulunamadı" mesajı veya 0 ürün ile boş sonuç sayfası

### TC-5.6 — Türkçe karakter ile arama ("kreatin")

- **Adımlar:**
  1. `kreatin` yaz, aramayı gönder
- **Beklenen sonuç:** Kreatin ürünleri listelenir

---

## 6. 06-product-listing.cy.js — Ürün Listeleme (Kategori Sayfası)

**Test edilen sayfa:** `/protein` (örnek kategori)

### TC-6.1 — Kategori sayfasının yüklenmesi

- **Adımlar:**
  1. `/protein` adresine git
- **Beklenen sonuç:** Sayfa açılır, "Toplam X ürün görüntüleniyor" benzeri ifade görünür

### TC-6.2 — Ürün kartlarının görünmesi

- **Adımlar:**
  1. Sayfadaki ürün kartlarını say
- **Beklenen sonuç:** En az 1 ürün kartı render edilir

### TC-6.3 — Ürün kartında resim, isim ve fiyatın bulunması

- **Adımlar:**
  1. İlk ürün kartını incele
- **Beklenen sonuç:** Görsel, isim ve fiyat bilgileri görünür

### TC-6.4 — Sıralama seçeneklerinin çalışması (varsa)

- **Adımlar:**
  1. Sıralama dropdown'ından "Fiyat: Artan" seç (eğer mevcutsa)
- **Beklenen sonuç:** Ürünler küçükten büyüğe sıralanır

### TC-6.5 — Filtreleme seçeneklerinin çalışması (varsa)

- **Adımlar:**
  1. Bir marka veya fiyat aralığı filtresi uygula (varsa)
- **Beklenen sonuç:** Listelenen ürünler filtre kriterine uyar

### TC-6.6 — Ürün kartına tıklayarak detay sayfasına gitme

- **Adımlar:**
  1. İlk ürün kartına tıkla
- **Beklenen sonuç:** Ürün detay sayfası açılır, URL ürün slug'ına döner

### TC-6.7 — Diğer kategori sayfalarının da düzgün açılması

- **Adımlar:**
  1. `/vitamin`, `/aksesuar`, `/gida` sayfalarına da git
- **Beklenen sonuç:** Hepsi 200 ile yüklenir ve ürün kartları render olur

---

## 7. 07-product-detail.cy.js — Ürün Detay

### TC-7.1 — Bir ürün detay sayfasının yüklenmesi

- **Adımlar:**
  1. `/protein` kategorisine git
  2. İlk ürün kartına tıkla
- **Beklenen sonuç:** Detay sayfası açılır

### TC-7.2 — Ürün adı, fiyatı ve görselinin gösterimi

- **Adımlar:**
  1. Detay sayfasında ürün adı, fiyat, ana görseli kontrol et
- **Beklenen sonuç:** Üçü de görünür ve boş değil

### TC-7.3 — Ürün açıklamasının görünmesi

- **Adımlar:**
  1. Açıklama / detay sekmesine bak
- **Beklenen sonuç:** Ürün açıklama metni render olur

### TC-7.4 — Aroma / varyant seçimi (varsa)

- **Adımlar:**
  1. Sayfada birden çok varyant seçici varsa bir varyant seç
- **Beklenen sonuç:** Seçim aktifleşir, fiyat/stok güncellenebilir

### TC-7.5 — Miktar arttırma / azaltma butonları

- **Adımlar:**
  1. Miktar input'unu "+ / −" ile değiştir
- **Beklenen sonuç:** Miktar değeri uygun şekilde günceller (en az 1 olur, eksi olamaz)

### TC-7.6 — "Sepete Ekle" butonu ile ürünü sepete ekleme

- **Adımlar:**
  1. "Sepete Ekle" butonuna tıkla
- **Beklenen sonuç:**
  - Başarılı eklenme bildirimi görünür (toast / modal)
  - Header sepet ikonunda ürün sayısı 1 artar

---

## 8. 08-cart.cy.js — Sepet

### TC-8.1 — Boş sepet ile sepet sayfasının açılması

- **Ön koşul:** Sepet boş
- **Adımlar:**
  1. Header'daki sepet ikonuna tıkla
- **Beklenen sonuç:** "Sepetinizde ürün bulunmamaktadır" mesajı görünür

### TC-8.2 — Sepete bir ürün eklendikten sonra sepet sayfasının doğru göstermesi

- **Adımlar:**
  1. Bir kategori → bir ürün → "Sepete Ekle"
  2. Sepete git
- **Beklenen sonuç:** Eklenen ürün sepet listesinde görünür, adet 1

### TC-8.3 — Sepet içinde ürün miktarını arttırma

- **Adımlar:**
  1. Sepette ürünün miktarını "+" ile arttır
- **Beklenen sonuç:** Adet 2 olur, toplam tutar buna göre güncellenir

### TC-8.4 — Sepet içinde ürün miktarını azaltma

- **Adımlar:**
  1. "−" butonu ile miktarı 1'e indir
- **Beklenen sonuç:** Adet 1 olur, toplam tutar günceller

### TC-8.5 — Sepetten ürün silme

- **Adımlar:**
  1. Sepetteki ürünün yanındaki "Sil" / çöp kutusu ikonuna tıkla
- **Beklenen sonuç:** Ürün sepetten kaldırılır, sepet boş hâle gelir

### TC-8.6 — Promosyon / indirim kodu girme alanı

- **Adımlar:**
  1. Promosyon kodu alanına geçersiz bir kod gir
  2. "Uygula" benzeri butona tıkla
- **Beklenen sonuç:** "Geçersiz kod" benzeri mesaj görünür, toplam tutar değişmez

### TC-8.7 — "DEVAM ET" / Checkout butonunun çalışması

- **Ön koşul:** Sepette en az 1 ürün
- **Adımlar:**
  1. Sepet sayfasında "DEVAM ET" butonuna tıkla
- **Beklenen sonuç:**
  - Misafir kullanıcı: Login/checkout sayfasına yönlendirilir
  - Giriş yapmış kullanıcı: Adres / ödeme adımına yönlendirilir

### TC-8.8 — Birden fazla farklı ürünü sepete ekleme

- **Adımlar:**
  1. İki farklı ürünü sepete ekle
  2. Sepete git
- **Beklenen sonuç:** Her iki ürün de listede görünür, toplam doğru hesaplanır

---
