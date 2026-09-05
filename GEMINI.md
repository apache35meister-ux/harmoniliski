# Proje Kuralları ve Geliştirme Yönergeleri (STRICT PROJECT RULES)

Bu dosya, bu projede yapılacak tüm geliştirme, düzenleme ve bakım işlemlerinde **MUTLAK SURETLE UYULMASI GEREKEN** kuralları tanımlar.

---

## 1. Yönetim Paneli (`panel.html`) Dokunulmazlığı
- **Asla Paneli Bozma:** Site genelinde toplu arama/değiştirme (regex, toplu replace scriptleri) yapılırken `panel.html` özel olarak korunmalıdır. CSS özellikleri veya JavaScript fonksiyon adları bozulmamalıdır.
- **Değişken ve Fonksiyon Çakışmaları:** JavaScript kodunda asla aynı isimde çift değişken (`const`, `let`) tanımlanmamalıdır (`SyntaxError` engeli).
- **Giriş ve Oturum Güvenliği:**
  - Giriş ekranında asla şifre (`hakan359`) veya ipucu ekrana yazdırılmamalıdır.
  - Oturum `sessionStorage` ile korunmalı, panel açılışında butonların ve fonksiyonların çalışması kesintiye uğratılmamalıdır.
  - Çıkış yapıldığında oturum güvenli şekilde kapanmalıdır.
- **Panel Butonlarının Çalışabilirliği:**
  - `switchTab`, `renderTable`, `openAddModal`, `editItem`, `toggleActive`, `toggleVitrin`, `exportCallLogsToCSV`, `saveTherapist`, `saveSettings`, `adminLogout` gibi kritik fonksiyonlar daima eksiksiz çalışır durumda kalmalıdır.

---

## 2. Mevcut Profiller ve Fiyat Bütünlüğü
- **14 Profil Dokunulmazlığı:** `therapists.json` içerisindeki tüm 14 escort profili, fotoğrafları, WhatsApp numaraları ve özel seans ücretleri korunmalıdır. Profil sayısı asla 8'e veya demo profillere düşürülmemelidir.
- **Canlı Senkronizasyon:** Admin panelden yapılan tüm güncellemeler GitHub API üzerinden `therapists.json`'a yazılmalı ve şehir sayfaları ile ana sayfa aynı güncel veriyi kullanmalıdır.

---

## 3. Sayfa ve Tasarım Bütünlüğü
- **Kelimeler:** Kullanıcı isteği doğrultusunda sitede "masör", "masöz", "terapist" kelimeleri yerine "escort" varyasyonları kullanılmaktadır.
- **İçerik Koruma:** Kullanıcının onayladığı ve çalışan hiçbir özellik (şehir filtreleri, arama çubuğu, WhatsApp bağlantıları, sayaçlar) yeni bir talep yapılırken bozulamaz, geriye alınamaz veya silinemez.

---

## 4. Değişiklikleri Doğrulama ve Canlıya Aktarma
- Herhangi bir kod değişikliği yapıldığında dosya sözdizimi (syntax) kontrol edilmeli.
- Değişiklikler GitHub ana dalına (`main`) commit ve push edilerek canlı sitenin (`harmoniliski.com`) her zaman güncel kalması sağlanmalıdır.
