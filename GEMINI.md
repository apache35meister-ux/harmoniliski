# Proje Kuralları ve Geliştirme Yönergeleri (STRICT PROJECT RULES)

Bu dosya, `harmoniliski.com` projesinde yapılacak tüm geliştirme, düzenleme, bakım ve yönetim işlemlerinde **MUTLAK SURETLE UYULMASI GEREKEN** kalıcı kuralları tanımlar.

---

## 1. Yönetim Paneli Giriş ve Şifre Güvenliği (KESİN KURAL)
- **Geçerli Giriş Şifresi:** Birincil şifre `hakan908558`, yedek şifre `hakan763`.
- **Mobil ve Büyük/Küçük Harf Toleransı:** Şifre doğrulaması `.trim().toLowerCase()` ile yapılmalıdır (kullanıcı mobilde `Hakan908558` yazsa dahi kabul edilir).
- **Mutlak Şifre Doğrulaması:** Şifre doğru girilmediği sürece panel KESİNLİKLE AÇILMAZ.
- **Şifre Sızdırma Yasağı:** Giriş ekranında, hata mesajlarında, butonlarda veya ekranda ASLA şifre açıkça YAZDIRILAMAZ / SIZDIRILAMAZ. Hatalı girişte yalnızca `❌ Hatalı şifre!` uyarısı gösterilir.
- **Üçüz Panel Eşitliği:** `panel.html`, `admin.html` ve `yonetim.html` dosyaları %100 birebir AYNI VE SENKRON olmak zorundadır. Herhangi birinde yapılan düzeltme diğer ikisine de istisnasız kopyalanır.
- **Oturum Bütünlüğü:** Oturum `sessionStorage` ile korunur (`isAdminLoggedIn === 'true'`). Panel butonları (`switchTab`, `renderTable`, `resetLiveAnalytics`, `saveTherapist` vb.) daima çalışır durumda kalmalıdır.

---

## 2. WhatsApp ve Arama Canlı Takip Sistemi (Zero-Mock & Gerçek Zamanlı Takip)
- **Gerçek Zamanlı Tıklama Takibi:** `index.html` ve tüm şehir/ilçe sayfalarındaki WhatsApp randevu butonları (`trackWaAction(tId, name, city)`) ve arama butonları (`trackCallAction(tId, name, city)`) tıklandığı an canlı sayaca işlenir.
- **Zorunlu Yardımcı Fonksiyonlar:** `getFormattedTime()` ve `addLogEntry(name, city, type)` fonksiyonları silinemez, eksiltilemez; her tıklamada log tablosuna gerçek zamanlı kayıt atar.
- **0ms Anlık Çapraz Sekme İletişimi:** Aynı tarayıcıda bir sekmede WhatsApp butonuna basıldığında diğer sekmedeki panelin anında güncellenmesi için `BroadcastChannel('zenspa_live_sync')` ve `window.addEventListener('storage')` mekanizmaları kalıcı olarak aktif tutulur.
- **Bulut Senkronizasyonu (GitHub API):** Etkileşimler arka planda GitHub reposundaki `analytics.json` dosyasına yazılır.
- **Veri Ezilmeme Kuralı (Math.max & Log Merge):** Buluttan gelen veri, tarayıcıdaki yeni yerel tıklamaları asla geriye çekemez veya silemez:
  `stats.waClicks = Math.max(stats.waClicks, cloudStats.totalWaClicks || 0);`
- **SIFIR MOCK (Sahte Veri Kesin Yasağı):** Sistemde veri olmadığında veya panel sıfırlandığında asla sahte/sabit sayılar (`18`, `7`, `142`, `Zeynep 3` vb.) geri gelemez. Sayaç sıfırsa sıfır (0) gösterilir. Gerçekte ne varsa sadece o yansıtılır.
- **Tam Tekil WhatsApp Tıklaması ve +1 Artış Kuralı (KESİN KURAL):** WhatsApp randevu butonlarına tıklandığında sayaç KESİNLİKLE aniden 6 veya birden fazla katlanamaz. Tıklamalar tekil `+1` olarak işlenir, mükerrer event dinleyicileri (event bubbling / double trigger) engellenmiştir. `_lastWaClickTime` ile 2 saniyelik debounce koruması aktif tutulur. Bu ayar ve sayaç mantığı KESİNLİKLE BOZULAMAZ.
- **Sıfırlama Mekanizması:** "Sıfırla" (`resetLiveAnalytics`) yapıldığında hem yerel `localStorage` hem de buluttaki `analytics.json` temiz 0 değerlerine çekilir. Açık tüm sekmelere `BroadcastChannel` ile `{ type: 'RESET' }` mesajı yollanarak tüm paneller aynı anda temizlenir.

---

## 3. Profil Bütünlüğü ve Görsel Standartlaştırması (15 Aktif Profil)
- **15 Profil Korunması:** Sitede daima Zeynep dahil toplam 15 profil aktif olmalıdır.
- **ASCII Görsel Dosya Yolları:** Tüm görseller `therapists.json` içinde ASCII harflerle tanımlanmalıdır (`pinar.jpg`, `burcak.jpg`, `sila.jpg`).
- **Türkçe Karakter Normalizasyonu (`getProfileImg`):** Paneldeki `getProfileImg(t)` fonksiyonunda `replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o')` normalizasyonu korunmalıdır. Sıla, Burçak, Pınar ve diğer tüm escort fotoğrafları daima eksiksiz görünmelidir.
- **Zeynep Profil Görseli:** Zeynep'in profil görseli `images/profiles/zeynep.jpg` olarak korunmalıdır.
- **KPI Kartı:** Yönetim panelindeki toplam profil sayısı KPI kartı (`kpiTotal`) daima 15 olarak gösterilmelidir.

---

## 4. Güvenli Çıkış (Secure Logout) Dokunulmazlığı
- **Koşulsuz Oturum Kapatma:** "Güvenli Çıkış Yap" butonuna tıklandığında `sessionStorage` ve `localStorage` üzerindeki `zenspa_panel_auth` jetonu silinir, `zenspa_logged_out = '1'` bayrağı set edilir ve `panel.php?action=logout&logged_out=1` sayfasına yönlendirilir.
- **Kilitleme Ekranı Onarımı:** Sayfa yüklendiğinde `isLoggedOut` kontrol edilir, kilit ekranı overlay'ı (`#adminAuthOverlay`) ekrandan kaldırılamaz ve şifre girilene kadar panel içeriği gizlenir.

---

## 4. Sayfa, Tasarım ve SEO Bütünlüğü
- **Kelimeler:** Kullanıcı isteği doğrultusunda sitede "masör", "masöz", "terapist" kelimeleri yerine "escort" varyasyonları kullanılmaktadır.
- **H1 Başlığı ve SEO Dokunulmazlığı:** Ana sayfadaki H1 başlığı (`🔥 Escort & VIP Eskort Bayan İlanları Kataloğu`) ve SEO meta etiketleri daima korunmalıdır.
- **Zero 404/410 Politikası:** Sitedeki eski linkler `404.html` akıllı yönlendirme algoritmasıyla 0 milisaniyede ilgili sayfaya veya ana sayfaya aktarılmalıdır.

---

## 5. Canlıya Alma ve Doğrulama Protokolü
- Herhangi bir kod değişikliği yapıldığında dosya sözdizimi kontrol edilmeli, GitHub `apache35meister-ux/harmoniliski` reposunun `main` dalına commit ve push edilerek canlı siteyle (`harmoniliski.com`) anında senkronize edilmelidir.
