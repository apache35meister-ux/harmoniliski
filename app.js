// --- ANTI-ATTACK & XSS SANITIZATION SHIELD ---
    function sanitize(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
      });
    }

    const defaultTherapists = [
  {
    "id": 1788738592899,
    "name": "Zeynep",
    "age": 25,
    "city": "Ankara",
    "district": "Merkez",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu",
      "Otel & Kendi Yeri"
    ],
    "tags": [
      "VIP Eskort",
      "Özel Seans",
      "Kendi Yeri",
      "Ankara"
    ],
    "bio": "Ankara Çankaya ve Merkez bölgesinde kendi lüks yerimde veya seçkin otellerde bağımsız, hijyenik ve elit VIP eskort hizmeti sunmaktayım. Güler yüzlü, samimi ve unutulmaz özel anlar için doğrudan WhatsApp üzerinden randevu alabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791330592899,
    "wa": "905456276130",
    "whatsapp": "905456276130",
    "img": "images/profiles/zeynep.jpg",
    "image": "images/profiles/zeynep.jpg",
    "images": [
      "images/profiles/zeynep.jpg"
    ],
    "photos": [
      "images/profiles/zeynep.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },

  {
    "id": 1788429948834,
    "name": "yeliz",
    "age": 23,
    "city": "izmir",
    "district": "konak",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "izmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791021948834,
    "wa": "905364999696",
    "whatsapp": "905364999696",
    "img": "images/profiles/yeliz.jpg",
    "image": "images/profiles/yeliz.jpg",
    "images": [
      "images/profiles/yeliz.jpg"
    ],
    "photos": [
      "images/profiles/yeliz.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1788429487588,
    "name": "nadya",
    "age": 21,
    "city": "izmir",
    "district": "Merkez",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "izmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791021487588,
    "wa": "905360423563",
    "whatsapp": "905360423563",
    "img": "images/profiles/nadya.jpg",
    "image": "images/profiles/nadya.jpg",
    "images": [
      "images/profiles/nadya.jpg"
    ],
    "photos": [
      "images/profiles/nadya.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1788429161947,
    "name": "funda",
    "age": 23,
    "city": "izmir",
    "district": "Merkez",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "izmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791021161947,
    "wa": "905360471313",
    "whatsapp": "905360471313",
    "img": "images/profiles/funda.jpg",
    "image": "images/profiles/funda.jpg",
    "images": [
      "images/profiles/funda.jpg"
    ],
    "photos": [
      "images/profiles/funda.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1788428841293,
    "name": "aysun",
    "age": 25,
    "city": "izmir",
    "district": "konak",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "izmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791020841293,
    "wa": "905376641285",
    "whatsapp": "905376641285",
    "img": "images/profiles/aysun.jpg",
    "image": "images/profiles/aysun.jpg",
    "images": [
      "images/profiles/aysun.jpg"
    ],
    "photos": [
      "images/profiles/aysun.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1788394289793,
    "name": "Bade",
    "age": 25,
    "city": "Aydın",
    "district": "İsabeyli",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Aydın bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1790986289793,
    "wa": "905412351039",
    "whatsapp": "905412351039",
    "img": "images/profiles/bade.jpg",
    "image": "images/profiles/bade.jpg",
    "images": [
      "images/profiles/bade.jpg"
    ],
    "photos": [
      "images/profiles/bade.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1788393834126,
    "name": "Kumsal",
    "age": 30,
    "city": "Aydın",
    "district": "Nazilli",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Aydın bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1790985834126,
    "wa": "905424481893",
    "whatsapp": "905424481893",
    "img": "images/profiles/kumsal.jpg",
    "image": "images/profiles/kumsal.jpg",
    "images": [
      "images/profiles/kumsal.jpg"
    ],
    "photos": [
      "images/profiles/kumsal.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787439999999,
    "name": "Merve",
    "age": 26,
    "city": "Aydın",
    "district": "Nazilli",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Aydın Nazilli bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1790983436135,
    "wa": "905398243593",
    "whatsapp": "905398243593",
    "img": "images/profiles/merve.jpg",
    "image": "images/profiles/merve.jpg",
    "images": [
      "images/profiles/merve.jpg"
    ],
    "photos": [
      "images/profiles/merve.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787433739873,
    "name": "Peri",
    "age": 32,
    "city": "Aydın",
    "district": "Merkez",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Aydın bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019406488,
    "wa": "905446029277",
    "whatsapp": "905446029277",
    "img": "images/profiles/peri.jpg",
    "image": "images/profiles/peri.jpg",
    "images": [
      "images/profiles/peri.jpg"
    ],
    "photos": [
      "images/profiles/peri.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787433267678,
    "name": "Ayla",
    "age": 30,
    "city": "Aydın",
    "district": "Nazilli",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Aydın bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019421815,
    "wa": "905300256187",
    "whatsapp": "905300256187",
    "img": "images/profiles/ayla.jpg",
    "image": "images/profiles/ayla.jpg",
    "images": [
      "images/profiles/ayla.jpg"
    ],
    "photos": [
      "images/profiles/ayla.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787254672367,
    "name": "Nisa",
    "age": 28,
    "city": "İzmir",
    "district": "Buca",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "İzmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019433091,
    "wa": "905416056033",
    "whatsapp": "905416056033",
    "img": "images/profiles/nisa.jpg",
    "image": "images/profiles/nisa.jpg",
    "images": [
      "images/profiles/nisa.jpg"
    ],
    "photos": [
      "images/profiles/nisa.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787133632639,
    "name": "Pınar",
    "age": 24,
    "city": "Uşak",
    "district": "Merkez",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "Uşak bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019443827,
    "wa": "905330593564",
    "whatsapp": "905330593564",
    "img": "images/profiles/pinar.jpg",
    "image": "images/profiles/pinar.jpg",
    "images": [
      "images/profiles/pinar.jpg"
    ],
    "photos": [
      "images/profiles/pinar.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787133440430,
    "name": "Melis",
    "age": 23,
    "city": "İzmir",
    "district": "Alsancak",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "İzmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": " ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019454992,
    "wa": "905398243593",
    "whatsapp": "905398243593",
    "img": "images/profiles/melis.jpg",
    "image": "images/profiles/melis.jpg",
    "images": [
      "images/profiles/melis.jpg"
    ],
    "photos": [
      "images/profiles/melis.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787133029944,
    "name": "Burçak",
    "age": 25,
    "city": "İzmir",
    "district": "Konak",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "İzmir bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019464212,
    "wa": "905380586549",
    "whatsapp": "905380586549",
    "img": "images/profiles/burcak.jpg",
    "image": "images/profiles/burcak.jpg",
    "images": [
      "images/profiles/burcak.jpg"
    ],
    "photos": [
      "images/profiles/burcak.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  },
  {
    "id": 1787093135705,
    "name": "Sıla",
    "age": 26,
    "city": "İstanbul",
    "district": "Kadıköy",
    "gender": "Kadın",
    "services": [
      "Klasik",
      "Özel Seans",
      "VIP Randevu"
    ],
    "tags": [
      "Klasik",
      "Özel Seans",
      "Kendi Yeri"
    ],
    "bio": "İstanbul bölgesinde profesyonel ve hijyenik ortamda eskort hizmeti sunmaktayım. Randevu için WhatsApp'tan yazabilirsiniz.",
    "price": "ESCORT",
    "vitrin": true,
    "active": true,
    "expiresAt": 1791019474254,
    "wa": "66639372920",
    "whatsapp": "66639372920",
    "img": "images/profiles/sila.jpg",
    "image": "images/profiles/sila.jpg",
    "images": [
      "images/profiles/sila.jpg"
    ],
    "photos": [
      "images/profiles/sila.jpg"
    ],
    "clicks": 1,
    "rating": "⭐ 5.0",
    "reviews": 12
  }
];


            // --- GELİŞMİŞ CANLI WHATSAPP & TELEFON ÇAĞRI İZLEME MOTORU ---
    function getFormattedTime() {
      const d = new Date();
      const pad = n => n.toString().padStart(2, '0');
      return pad(d.getDate()) + '.' + pad(d.getMonth()+1) + '.' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function addLogEntry(tName, city, actionType) {
      try {
        let logs = JSON.parse(localStorage.getItem('zenescort_live_call_logs') || '[]');
        logs.unshift({
          time: getFormattedTime(),
          name: tName || 'VIP Escort',
          city: city || 'Türkiye',
          type: actionType
        });
        if (logs.length > 50) logs = logs.slice(0, 50); // son 50 arama ve mesaj kaydi
        localStorage.setItem('zenescort_live_call_logs', JSON.stringify(logs));
      } catch(e) {}
    }

    function trackPageVisit() {
      let visits = parseInt(localStorage.getItem('zenescort_real_visits') || '1');
      visits++;
      localStorage.setItem('zenescort_real_visits', visits.toString());
    }

    // --- MERKEZİ TÜM TELEFONLAR İÇİN BULUT ÇAĞRI & MESAJ SENKRONİZASYONU ---
        // Remote analytics writes are disabled; visitor data never goes to public GitHub Pages.

    function trackWaAction(tId, tName, city) {
      let name = tName;
      let c = city;
      if (!name || !c) {
        const t = (therapists || []).find(item => item.id == tId);
        if (t) {
          name = name || t.name;
          c = c || t.city;
        }
      }
      name = name || 'VIP Escort';
      c = c || 'Türkiye';

      let totalWa = parseInt(localStorage.getItem('zenescort_real_wa_clicks') || '0');
      totalWa++;
      localStorage.setItem('zenescort_real_wa_clicks', totalWa.toString());

      if (tId) {
        let tClicks = JSON.parse(localStorage.getItem('zenescort_t_clicks') || '{}');
        tClicks[tId] = (tClicks[tId] || 0) + 1;
        localStorage.setItem('zenescort_t_clicks', JSON.stringify(tClicks));
      }

      addLogEntry(name, c, '💬 WhatsApp Randevu Talebi');

    }

    function trackCallAction(tId, tName, city) {
      let name = tName;
      let c = city;
      if (!name || !c) {
        const t = (therapists || []).find(item => item.id == tId);
        if (t) {
          name = name || t.name;
          c = c || t.city;
        }
      }
      name = name || 'VIP Escort';
      c = c || 'Türkiye';

      let totalCalls = parseInt(localStorage.getItem('zenescort_real_calls') || '0');
      totalCalls++;
      localStorage.setItem('zenescort_real_calls', totalCalls.toString());

      if (tId) {
        let tCalls = JSON.parse(localStorage.getItem('zenescort_t_calls') || '{}');
        tCalls[tId] = (tCalls[tId] || 0) + 1;
        localStorage.setItem('zenescort_t_calls', JSON.stringify(tCalls));
      }

      addLogEntry(name, c, '📞 Doğrudan Telefon Araması');

    }

    function trackAdClick() {
      let totalAd = parseInt(localStorage.getItem('zenescort_real_ad_clicks') || '0');
      totalAd++;
      localStorage.setItem('zenescort_real_ad_clicks', totalAd.toString());
    }

    // Global WhatsApp ve Telefon Tıklama Yakalayıcı (%100 Garanti Kapsama)
    document.addEventListener('click', function(e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      
      if (href.includes('whatsapp.com') || href.includes('wa.me')) {
        if (!a.getAttribute('onclick') || !a.getAttribute('onclick').includes('trackWaAction')) {
          const card = a.closest('.therapist-card') || a.closest('.card') || a.closest('.modal-body');
          let tName = 'VIP İlan / Genel Randevu';
          let tCity = (typeof detectedCityName !== 'undefined' ? detectedCityName : 'Türkiye');
          let tId = 0;
          if (card) {
            const nameEl = card.querySelector('h3, .therapist-name, strong');
            if (nameEl) tName = nameEl.textContent.trim();
            const cityEl = card.querySelector('.badge-city, .location, [class*="city"]');
            if (cityEl) tCity = cityEl.textContent.trim();
          }
          trackWaAction(tId, tName, tCity);
        }
      } else if (href.startsWith('tel:')) {
        if (!a.getAttribute('onclick') || !a.getAttribute('onclick').includes('trackCallAction')) {
          const card = a.closest('.therapist-card') || a.closest('.card') || a.closest('.modal-body');
          let tName = 'VIP Telefon Araması';
          let tCity = (typeof detectedCityName !== 'undefined' ? detectedCityName : 'Türkiye');
          let tId = 0;
          if (card) {
            const nameEl = card.querySelector('h3, .therapist-name, strong');
            if (nameEl) tName = nameEl.textContent.trim();
          }
          trackCallAction(tId, tName, tCity);
        }
      }
    }, true);

    function getStoredTherapists() {
      try {
        const local = localStorage.getItem('zenescort_therapists');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length >= 14) return parsed;
        }
      } catch(e) {}
      return defaultTherapists;
    }

    let therapists = getStoredTherapists();
    let activeServicePill = "all";

                    function formatPhone(phone) {
      if (!phone) return "15096204167";
      let p = phone.toString().replace(/\D/g, '');
      if (!p) return "15096204167";
      if (p.startsWith('0') && p.length === 11) p = '90' + p.substring(1);
      else if (p.length === 10 && p.startsWith('5')) p = '90' + p;
      return p;
    }

    function getWaLink(phone, msg) {
      const p = formatPhone(phone);
      const text = encodeURIComponent(msg || "Merhaba, özel seans için randevu almak istiyorum.");
      return "https://api.whatsapp.com/send/?phone=" + p + "&text=" + text;
    }

    async function loadLiveTherapists() {
      // Demo profilleri filtrele - eger cache'de eski demo profiller varsa hemen temizle
      const local = localStorage.getItem('zenescort_therapists');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const hasDemo = parsed.some(t => ['Selin', 'Derya', 'Elif', 'Emre', 'Zeynep', 'Cansu', 'Burak', 'Gamze', 'Büşra', 'Mert', 'Ezgi', 'Hande', 'Nilay'].includes(t.name));
            if (hasDemo) {
              localStorage.removeItem('zenescort_therapists');
            } else {
              therapists = parsed;
              renderTherapists(therapists);
            }
          }
        } catch(e) {}
      }

      // 2. Fetch fresh live data directly from raw GitHub (bypasses GitHub Pages CDN delay)
      try {
        const rawRes = await fetch('https://raw.githubusercontent.com/apache35meister-ux/harmoniliski/main/therapists.json?t=' + Date.now(), { cache: 'no-store' });
        if (rawRes.ok) {
          const liveList = await rawRes.json();
          if (Array.isArray(liveList) && liveList.length > 0) {
            therapists = liveList;
            try { localStorage.setItem('zenescort_therapists', JSON.stringify(liveList)); } catch(e) {}
            renderTherapists(therapists);
            return;
          }
        }
      } catch(e) {}

      // 3. Fallback to local ./therapists.json
      try {
        const res = await fetch('./therapists.json?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const liveList = await res.json();
          if (Array.isArray(liveList) && liveList.length > 0) {
            therapists = liveList;
            try { localStorage.setItem('zenescort_therapists', JSON.stringify(liveList)); } catch(e) {}
            renderTherapists(therapists);
            return;
          }
        }
      } catch(e) {}

      renderTherapists(therapists);
    }

    function filterDistrict(districtName, cityName, btnEl) {
      if (btnEl) {
        document.querySelectorAll('.filter-pills-bar .filter-pill-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
      }
      
      const citySelect = document.getElementById('citySelect');
      if (citySelect && cityName) {
        citySelect.value = cityName;
      }

      const q = districtName.toLowerCase().trim();
      const filtered = therapists.filter(t => {
        const d = (t.district || '').toLowerCase();
        const b = (t.bio || '').toLowerCase();
        const tags = (t.tags || []).join(' ').toLowerCase();
        const cityMatch = !cityName || t.city.toLowerCase() === cityName.toLowerCase();
        return cityMatch && (d.includes(q) || b.includes(q) || tags.includes(q));
      });

      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.innerHTML = `${cityName ? cityName + ' ' : ''}${districtName} <span class="gold-shimmer">VIP Eskort Rehberi</span>`;
      }
      document.title = `${cityName ? cityName + ' ' : ''}${districtName} VIP Eskort Bayan İlanları | ZenEscort`;

      renderTherapists(filtered);
    }

    function checkUrlCityFilter() {
      const urlParams = new URLSearchParams(window.location.search);
      const cityParam = urlParams.get('city');
      const districtParam = urlParams.get('district');

      if (districtParam) {
        let matchedCity = '';
        if (cityParam) {
          const select = document.getElementById('citySelect');
          if (select) {
            for (let opt of select.options) {
              const optSlug = opt.value.toLowerCase().replace('ı','i').replace('ğ','g').replace('ü','u').replace('ş','s').replace('ö','o').replace('ç','c').replace(' ','-');
              if (optSlug === cityParam.toLowerCase() || opt.value.toLowerCase() === cityParam.toLowerCase()) {
                select.value = opt.value;
                matchedCity = opt.value;
                break;
              }
            }
          }
        }
        filterDistrict(districtParam, matchedCity);
        return;
      }

      if (cityParam) {
        let cp = cityParam.toLowerCase().trim();
        const select = document.getElementById('citySelect');
        if (select) {
          for (let opt of select.options) {
            const optSlug = opt.value.toLowerCase().replace('ı','i').replace('ğ','g').replace('ü','u').replace('ş','s').replace('ö','o').replace('ç','c').replace(' ','-');
            if (optSlug === cp || opt.value.toLowerCase() === cp) {
              select.value = opt.value;
              filterTherapists();
              break;
            }
          }
        }
      }
    }

    function renderTherapists(rawList) {

      if (!list || list.length === 0) {
        const cityName = currentCityFilter ? (currentCityFilter.charAt(0).toUpperCase() + currentCityFilter.slice(1)) : 'Bu Şehirde';
        container.innerHTML = `
          <div class="vip-concierge-card" style="grid-column: 1 / -1; background: linear-gradient(145deg, #16161F, #0E0E12); border: 2px solid #E6AF2E; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.8); margin: 1.5rem 0;">
            <div style="display: inline-block; background: rgba(230,175,46,0.15); color: #FDE047; border: 1px solid #E6AF2E; font-size: 0.8rem; font-weight: 800; padding: 6px 16px; border-radius: 999px; margin-bottom: 14px;">👑 VIP KONSİYERJ & CANLI REZERVASYON HATTI</div>
            <h3 style="color: #FFF; font-size: 1.6rem; font-weight: 900; margin: 0 0 10px;">${cityName} İçin Özel Müsaitlik & VIP Yönlendirme</h3>
            <p style="color: #D1D5DB; font-size: 0.95rem; max-width: 650px; margin: 0 auto 20px; line-height: 1.6;">
              ${cityName} bölgesinde konakladığınız otelde veya kendi lüks yerinizde hizmet verebilecek bağımsız VIP eskort seçenekleri ve anlık müsait bayanlar için doğrudan merkez danışma hattımıza yazabilirsiniz.
            </p>
            <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
              <a href="https://api.whatsapp.com/send/?phone=15096204167&text=Merhaba,%20${encodeURIComponent(cityName)}%20bolgesinde%20VIP%20musaitlik%20ve%20rezervasyon%20icin%20bilgi%20almak%20istiyorum." target="_blank" style="background: linear-gradient(135deg, #25D366, #128C7E); color: #FFF; text-decoration: none; font-weight: 800; font-size: 1rem; padding: 14px 28px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 8px 20px rgba(37,211,102,0.4);">
                💬 ${cityName} Müsaitlik Sor (WhatsApp)
              </a>
              <a href="tel:15096204167" style="background: #1F2937; border: 1px solid #374151; color: #FFF; text-decoration: none; font-weight: 800; font-size: 1rem; padding: 14px 24px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px;">
                📞 VIP Hattı Ara
              </a>
            </div>
            <div style="margin-top: 18px; color: #9CA3AF; font-size: 0.78rem;">
              ✔ 7/24 Kesintisiz Canlı Teyit • %100 Gizlilik Garantisi • Seçkin Otel Hizmeti
            </div>
          </div>
        `;
        return;
      }


      // Yalnizca aktif olan VE suresi dolmamis escortları yayinda goster (Otomatik Pasife Alma)
      let list = (rawList || []).filter(t => {
        if (t.active === false) return false;
        if (t.expiresAt && Date.now() >= t.expiresAt) return false;
        return true;
      });
      const container = document.getElementById('therapistsContainer');
      const countDisplay = document.getElementById('countDisplay');
      const selectedCity = document.getElementById('citySelect')?.value || 'all';
      const selectedDistrict = document.getElementById('districtSelect')?.value || 'all';
      
      // AKILLI VİTRİN KANCASI (Boş Şehirlerde & İlçelerde Escort Çeken Altın Kart)
            // AKILLI VİTRİN: İlçe veya filtrede özel üye yoksa vitrini boş bırakma, tüm onaylı üyeleri göster!
      if (!list || list.length === 0) {
        const fallbackList = (therapists || []).filter(t => t.active !== false);
        if (fallbackList.length > 0) {
          list = fallbackList;
          if (countDisplay) countDisplay.innerHTML = `<span style="color:var(--accent-gold);">Tüm Onaylı Escortlar (${list.length})</span>`;
        } else {
          let locationLabel = 'Türkiye Geneli';
          if (selectedCity !== 'all' && selectedDistrict !== 'all') {
            locationLabel = `${selectedCity} / ${selectedDistrict}`;
          } else if (selectedCity !== 'all') {
            locationLabel = selectedCity;
          }
          container.innerHTML = `
            <div class="empty-state-magnet" style="grid-column: 1 / -1; background: linear-gradient(145deg, rgba(28, 28, 34, 0.95), rgba(15, 15, 18, 0.98)); border: 2px dashed rgba(212, 175, 55, 0.4); border-radius: var(--radius-xl); padding: 3rem 1.5rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">👑</div>
              <h3 style="color: var(--accent-gold); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem;">${locationLabel} VIP Eskort Vitrini</h3>
              <p style="color: #ccc; margin-bottom: 1.5rem;">Tüm escortlarımiz onaylı ve aktiftir.</p>
              <button onclick="resetFilters()" style="background: #1C1C22; color: #FFF; border: 1px solid var(--border-gold); font-weight: 700; padding: 0.9rem 1.8rem; border-radius: var(--radius-full); cursor: pointer;">
                Tüm Vitrini Görüntüle
              </button>
            </div>
          `;
          if (countDisplay) countDisplay.textContent = "0 Escort";
          return;
        }
      }

      countDisplay.textContent = `Toplam ${list.length} Escort`;

      container.innerHTML = list.map(t => {
        const waLink = getWaLink(t.wa || t.whatsapp, `Merhaba ${t.name}, ZenEscort VIP profilinizi inceledim. Bugün müsaitlik durumunuz ve özel seans detayları için bilgi alabilir miyim?`);
        const telNumber = formatPhone(t.wa || t.whatsapp);

        return `
          <article class="card-therapist" data-id="${t.id}" itemscope itemtype="https://schema.org/Person">
            <div class="card-image-wrap" data-id="${t.id}" onclick="openPhotoModal(${t.id})" title="Fotoğrafları ve Profili İncele">
              <img src="${t.img || t.image}" alt="${t.name} - ${t.city} Escort Escort" itemprop="image" class="card-img" onerror="this.onerror=null; this.src='https://harmoniliski.com/images/profiles/yeliz.jpg';" loading="lazy">
              <div class="card-vignette"></div>
              
              <!-- Badges -->
              <div class="badge-vip-top">👑 VIP VİTRİN</div>
              <div class="badge-live-available">
                <span class="pulse-dot-green"></span>
                <span>Şu An Müsait</span>
              </div>

              ${((t.images && t.images.length > 1) || (t.photos && t.photos.length > 1)) ? `
                <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.85); border: 1px solid var(--border-gold); color: #FDE047; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; display: flex; align-items: center; gap: 4px; z-index: 4;">
                  <span>📸</span> <span>${(t.images || t.photos).length} Fotoğraf</span>
                </div>
              ` : `
                <!-- Fotoğrafı Büyüt İpucu -->
                <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.75); border: 1px solid rgba(255,255,255,0.25); color: #FFF; font-size: 0.72rem; font-weight: 700; padding: 4px 9px; border-radius: 999px; display: flex; align-items: center; gap: 4px; z-index: 3;">
                  <span>🔍 Fotoğrafı Büyüt</span>
                </div>
              `}

              <div class="badge-photo-bottom" style="left: 12px; bottom: 12px; right: auto;">
                <span class="photo-loc-tag">📍 ${sanitize(t.city)}</span>
                <span class="photo-rating-tag">⭐ ${t.rating || '4.9'}</span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-head">
                <div class="card-title-row" onclick="openPhotoModal(${t.id})" style="cursor: pointer;" title="Detayları Görüntüle">
                  <h4 class="card-name" itemprop="name">${sanitize(t.name)}</h4>
                  <span class="card-age">${t.age} Yaş</span>
                </div>
                <div class="card-city" itemprop="addressLocality">📍 ${sanitize(t.city)}, ${sanitize(t.district || '')}</div>
              </div>

              <p class="card-bio" itemprop="description">${sanitize(t.bio)}</p>

              <div class="card-tags">
                ${t.tags ? t.tags.map(tag => `<span class="card-tag">${sanitize(tag)}</span>`).join('') : ''}
              </div>

              <div class="card-price-row">
                <span class="price-label">⏱️ Seans Ücreti</span>
                <span class="price-val">${sanitize(t.price)}</span>
              </div>

              <div class="card-actions-dual">
                <a href="${waLink}" target="_blank" onclick="trackWaAction(${t.id}, '${t.name}', '${t.city}')" class="btn-action-wa" title="${t.name} ile WhatsApp Randevusu Al">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
                <a href="tel:+${telNumber}" onclick="trackCallAction(${t.id}, '${t.name}', '${t.city}')" class="btn-action-call" title="${t.name} Randevu Hattını Ara">
                  <span>📞</span>
                  <span>Hemen Ara</span>
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    function setQuickPill(type, btnEl) {
      document.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');

      if (type === 'all') {
        resetFilters();
      } else if (type === 'vitrin') {
        const vitrinList = therapists.filter(t => t.vitrin);
        renderTherapists(vitrinList);
      } else if (type === 'Kadın' || type === 'Erkek') {
        document.getElementById('genderSelect').value = type;
        filterTherapists();
      } else {
        document.getElementById('citySelect').value = type;
        filterTherapists();
      }
    }

    const cityDistricts = {
      "İstanbul": ["Kadıköy", "Şişli", "Nişantaşı", "Beşiktaş", "Levent", "Bakırköy", "Florya", "Beylikdüzü", "Ataşehir", "Üsküdar", "Maltepe", "Kartal", "Pendik", "Sarıyer", "Fatih", "Beyoğlu", "Taksim", "Esenyurt", "Başakşehir", "Avcılar", "Tuzla", "Zeytinburnu", "Büyükçekmece", "Bahçelievler", "Kağıthane"],
      "Ankara": ["Çankaya", "Kızılay", "Tunalı", "Eryaman", "Batıkent", "Keçiören", "Yenimahalle", "Etimesgut", "Mamak", "Gölbaşı", "Altındağ", "Sincan", "Pursaklar"],
      "İzmir": ["Alsancak", "Konak", "Karşıyaka", "Bornova", "Buca", "Çiğli", "Bayraklı", "Balçova", "Gaziemir", "Çeşme", "Alaçatı", "Urla", "Karabağlar", "Menemen", "Torbalı", "Narlıdere", "Güzelbahçe", "Seferihisar", "Foça"],
      "Antalya": ["Muratpaşa", "Lara", "Konyaaltı", "Kepez", "Alanya", "Manavgat", "Side", "Kemer", "Kaş", "Kalkan", "Serik", "Belek", "Döşemealtı", "Kumluca"],
      "Bursa": ["Nilüfer", "FSM", "Osmangazi", "Yıldırım", "Mudanya", "Gemlik", "İnegöl", "Gürsu", "Kestel"],
      "Muğla": ["Bodrum", "Yalıkavak", "Türkbükü", "Gümbet", "Bitez", "Marmaris", "İçmeler", "Fethiye", "Ölüdeniz", "Datça", "Milas", "Ortaca", "Dalyan", "Köyceğiz", "Menteşe"],
      "Adana": ["Seyhan", "Ziyapaşa", "Çukurova", "Yüreğir", "Sarıçam", "Ceyhan", "Kozan"],
      "Kocaeli": ["İzmit", "Gebze", "Başiskele", "Kartepe", "Gölcük", "Darıca", "Körfez", "Karamürsel", "Derince", "Çayırova"],
      "Eskişehir": ["Tepebaşı", "Bağlar", "Odunpazarı"],
      "Gaziantep": ["Şehitkamil", "İbrahimli", "Şahinbey", "Oğuzeli"],
      "Mersin": ["Yenişehir", "Mezitli", "Toroslar", "Akdeniz", "Erdemli", "Tarsus", "Silifke", "Anamur"],
      "Konya": ["Selçuklu", "Meram", "Karatay", "Ereğli", "Akşehir"],
      "Samsun": ["Atakum", "İlkadım", "Canik", "Tekkeköy", "Bafra", "Çarşamba"],
      "Trabzon": ["Ortahisar", "Akçaabat", "Yomra", "Of", "Araklı"],
      "Balıkesir": ["Altıeylül", "Karesi", "Edremit", "Akçay", "Ayvalık", "Cunda", "Bandırma", "Burhaniye", "Erdek", "Gönen"],
      "Aydın": ["Efeler", "Kuşadası", "Didim", "Nazilli", "Söke", "Germencik"],
      "Tekirdağ": ["Süleymanpaşa", "Çorlu", "Çerkezköy", "Kapaklı", "Ergene"],
      "Sakarya": ["Adapazarı", "Serdivan", "Sapanca", "Erenler", "Akyazı", "Hendek", "Karasu"],
      "Denizli": ["Pamukkale", "Merkezefendi"],
      "Hatay": ["Antakya", "İskenderun", "Defne", "Dörtyol", "Samandağ"],
      "Kayseri": ["Melikgazi", "Kocasinan", "Talas"],
      "Diyarbakır": ["Kayapınar", "Bağlar", "Yenişehir", "Sur"],
      "Manisa": ["Yunusemre", "Şehzadeler", "Akhisar", "Turgutlu", "Salihli", "Soma"],
      "Çanakkale": ["Merkez", "Biga", "Gelibolu", "Ayvacık", "Bozcaada", "Gökçeada"],
      "Yalova": ["Merkez", "Çınarcık", "Altınova", "Armutlu", "Termal"]
    };

    function updateDistrictOptions(cityName, selectDistrict) {
      const distSelect = document.getElementById('districtSelect');
      if (!distSelect) return;

      distSelect.innerHTML = '<option value="all">Tüm İlçeler & Semtler</option>';

      if (cityName && cityName !== 'all' && cityDistricts[cityName]) {
        cityDistricts[cityName].forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          opt.textContent = d;
          if (selectDistrict && selectDistrict.toLowerCase() === d.toLowerCase()) {
            opt.selected = true;
          }
          distSelect.appendChild(opt);
        });
      } else if (!cityName || cityName === 'all') {
        const allPopular = ["Kadıköy", "Şişli", "Nişantaşı", "Beşiktaş", "Bakırköy", "Beylikdüzü", "Çankaya", "Kızılay", "Alsancak", "Karşıyaka", "Bornova", "Lara", "Alanya", "Bodrum", "Çeşme", "Marmaris", "Fethiye", "Nilüfer", "İzmit", "Seyhan"];
        allPopular.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          opt.textContent = d;
          if (selectDistrict && selectDistrict.toLowerCase() === d.toLowerCase()) {
            opt.selected = true;
          }
          distSelect.appendChild(opt);
        });
      }
    }

    function filterTherapists() {
      const citySelectEl = document.getElementById('citySelect');
      const city = citySelectEl ? citySelectEl.value : 'all';
      const districtSelectEl = document.getElementById('districtSelect');
      const district = districtSelectEl ? districtSelectEl.value : 'all';
      const service = document.getElementById('serviceSelect') ? document.getElementById('serviceSelect').value : 'all';
      const gender = document.getElementById('genderSelect').value;
      const search = document.getElementById('searchInput').value.toLowerCase().trim();

      const filtered = therapists.filter(t => {
        if (city !== 'all' && t.city !== city) return false;
        
        if (district !== 'all') {
          const tDist = (t.district || '').toLowerCase();
          const tTags = (t.tags || []).join(' ').toLowerCase();
          const tBio = (t.bio || '').toLowerCase();
          const targetDist = district.toLowerCase();
          if (!tDist.includes(targetDist) && !tTags.includes(targetDist) && !tBio.includes(targetDist)) {
            return false;
          }
        }

        if (gender !== 'all' && t.gender !== gender) return false;
        if (service !== 'all' && (!t.services || !t.services.includes(service))) return false;
        if (activeServicePill !== 'all' && (!t.services || !t.services.includes(activeServicePill))) return false;

        if (search) {
          const tagsStr = t.tags ? t.tags.join(' ') : '';
          const combined = (t.name + ' ' + t.city + ' ' + (t.district || '') + ' ' + (t.bio || '') + ' ' + tagsStr).toLowerCase();
          if (!combined.includes(search)) return false;
        }

        return true;
      });

      renderTherapists(filtered);
    }

    function setServicePill(serviceName, btnEl) {
      activeServicePill = serviceName;
      document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      filterTherapists();
    }

    function filterCity(cityName) {
      const citySelect = document.getElementById('citySelect');
      if (citySelect) {
        citySelect.value = cityName;
        updateDistrictOptions(cityName);
      }
      filterTherapists();
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }

    function filterDistrict(districtName, cityName) {
      const citySelect = document.getElementById('citySelect');
      if (cityName && citySelect) {
        citySelect.value = cityName;
        updateDistrictOptions(cityName, districtName);
      } else {
        updateDistrictOptions('all', districtName);
      }
      const distSelect = document.getElementById('districtSelect');
      if (distSelect) {
        distSelect.value = districtName;
      }
      filterTherapists();
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }

    function filterService(serviceName) {
      document.getElementById('serviceSelect').value = serviceName;
      filterTherapists();
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }

    function resetFilters() {
      const citySelect = document.getElementById('citySelect');
      if (citySelect) citySelect.value = 'all';
      updateDistrictOptions('all');
      document.getElementById('districtSelect').value = 'all';
      document.getElementById('serviceSelect').value = 'all';
      document.getElementById('genderSelect').value = 'all';
      document.getElementById('searchInput').value = '';
      activeServicePill = 'all';
      document.querySelectorAll('.pill-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === 0);
      });
      renderTherapists(therapists);
    }

    // Şehir değiştiğinde ilçeleri dinamik güncelle
    document.getElementById('citySelect')?.addEventListener('change', function() {
      updateDistrictOptions(this.value);
    });

    function openVitrinModal() { document.getElementById('vitrinModal').classList.add('active'); }
    function closeVitrinModal() { document.getElementById('vitrinModal').classList.remove('active'); }

    document.getElementById('vitrinModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'vitrinModal') closeVitrinModal();
    });

    // --- HD ÇOKLU FOTOĞRAF & GALERİ SLIDER MODAL MOTORU ---
    let activeModalPhotos = [];
    let activePhotoIndex = 0;

    function updateModalPhotoDisplay() {
      const img = document.getElementById('pvImg');
      const counter = document.getElementById('pvCounterBadge');
      const prevBtn = document.getElementById('pvPrevBtn');
      const nextBtn = document.getElementById('pvNextBtn');
      const strip = document.getElementById('pvThumbnailsStrip');

      if (!activeModalPhotos || activeModalPhotos.length === 0) return;

      const currentSrc = activeModalPhotos[activePhotoIndex];
      if (img) {
        img.style.opacity = '0.3';
        setTimeout(() => {
          img.src = currentSrc;
          img.style.opacity = '1';
        }, 150);
      }

      const totalPhotos = activeModalPhotos.length;
      if (totalPhotos > 1) {
        if (counter) {
          counter.style.display = 'block';
          counter.textContent = `📷 ${activePhotoIndex + 1} / ${totalPhotos}`;
        }
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        
        if (strip) {
          strip.style.display = 'flex';
          strip.innerHTML = activeModalPhotos.map((p, idx) => `
            <div onclick="selectModalPhoto(${idx})" style="width:54px; height:54px; flex-shrink:0; border-radius:6px; overflow:hidden; cursor:pointer; border:2px solid ${idx === activePhotoIndex ? '#FBBF24' : 'rgba(255,255,255,0.15)'}; opacity:${idx === activePhotoIndex ? '1' : '0.6'}; transition:all 0.2s;">
              <img src="${p}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='images/profiles/yeliz.jpg'" loading="lazy">
            </div>
          `).join('');
        }
      } else {
        if (counter) counter.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (strip) strip.style.display = 'none';
      }
    }

    function prevModalPhoto(e) {
      if (e) e.stopPropagation();
      if (activeModalPhotos.length <= 1) return;
      activePhotoIndex = (activePhotoIndex - 1 + activeModalPhotos.length) % activeModalPhotos.length;
      updateModalPhotoDisplay();
    }

    function nextModalPhoto(e) {
      if (e) e.stopPropagation();
      if (activeModalPhotos.length <= 1) return;
      activePhotoIndex = (activePhotoIndex + 1) % activeModalPhotos.length;
      updateModalPhotoDisplay();
    }

    function selectModalPhoto(idx) {
      if (idx >= 0 && idx < activeModalPhotos.length) {
        activePhotoIndex = idx;
        updateModalPhotoDisplay();
      }
    }

    function openPhotoModal(id) {
      let t = (therapists || []).find(item => item.id == id);
      if (!t && typeof defaultTherapists !== 'undefined') {
        t = defaultTherapists.find(item => item.id == id);
      }
      if (!t) return;

      const modal = document.getElementById('photoViewerModal');
      const name = document.getElementById('pvName');
      const loc = document.getElementById('pvLocation');
      const price = document.getElementById('pvPrice');
      const rating = document.getElementById('pvRating');
      const bio = document.getElementById('pvBio');
      const tags = document.getElementById('pvTags');
      const waBtn = document.getElementById('pvWaBtn');
      const callBtn = document.getElementById('pvCallBtn');

      if (Array.isArray(t.images) && t.images.length > 0) {
        activeModalPhotos = [...t.images];
      } else if (Array.isArray(t.photos) && t.photos.length > 0) {
        activeModalPhotos = [...t.photos];
      } else {
        activeModalPhotos = [t.img || t.image || "images/profiles/yeliz.jpg"];
      }
      activePhotoIndex = 0;
      updateModalPhotoDisplay();

      if (name) name.textContent = `${t.name} (${t.age} Yaş)`;
      if (loc) loc.textContent = `📍 ${t.city}${t.district ? ', ' + t.district : ''}`;
      if (price) price.textContent = t.price || '60 Dk: 2.000 ₺';
      if (rating) rating.textContent = `⭐ ${t.rating || '5.0'} (${t.reviews || 48} Değerlendirme)`;
      if (bio) bio.textContent = t.bio || `${t.city} bölgesinde VIP ve hijyenik eskort hizmeti sunmaktadır.`;

      if (tags) {
        const tagList = t.tags || t.services || ['Klasik Seans', 'Özel Seans', 'Medikal'];
        tags.innerHTML = tagList.map(tag => `<span class="card-tag" style="background:#181822; border:1px solid rgba(255,255,255,0.15); color:#FDE047; font-weight:700;">${sanitize(tag)}</span>`).join('');
      }

      const waLink = getWaLink(t.wa || t.whatsapp, `Merhaba ${t.name}, profilinizi ve fotoğraflarınızı detaylı inceledim. Özel seans için randevu almak istiyorum.`);
      const telNum = formatPhone(t.wa || t.whatsapp);

      if (waBtn) {
        waBtn.href = waLink;
        waBtn.onclick = () => trackWaAction(t.id, t.name, t.city);
      }
      if (callBtn) {
        callBtn.href = `tel:+${telNum}`;
        callBtn.onclick = () => trackCallAction(t.id, t.name, t.city);
      }

      if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.documentElement.style.overflow = 'hidden';
      }
    }

    function closePhotoModal() {
      const modal = document.getElementById('photoViewerModal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.documentElement.style.overflow = '';
      }
    }

    function handlePhotoModalBackdrop(e) {
      if (e.target.id === 'photoViewerModal') {
        closePhotoModal();
      }
    }

    // Klavye ile Fotoğraf Kaydırma (Sol / Sağ Ok Tuşları)
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('photoViewerModal');
      const isModalOpen = modal && (modal.classList.contains('active') || modal.style.display === 'flex');

      if (e.key === 'Escape') {
        closePhotoModal();
        closeVitrinModal();
      } else if (isModalOpen && e.key === 'ArrowRight') {
        nextModalPhoto();
      } else if (isModalOpen && e.key === 'ArrowLeft') {
        prevModalPhoto();
      }
    });

    // Mobil Cihazlar İçin Dokunmatik Kaydırma (Touch Swipe Support)
    let touchStartX = 0;
    let touchEndX = 0;
    const imgWrapper = document.getElementById('pvImageWrapper');
    if (imgWrapper) {
      imgWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      imgWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          nextModalPhoto(); // Sola kaydırınca sonraki fotoğraf
        } else if (touchEndX - touchStartX > 50) {
          prevModalPhoto(); // Sağa kaydırınca önceki fotoğraf
        }
      }, { passive: true });
    }

    window.prevModalPhoto = prevModalPhoto;
    window.nextModalPhoto = nextModalPhoto;
    window.selectModalPhoto = selectModalPhoto;

    // Global Click Delegation (Tüm cihazlar ve dinamik kartlar için)
    document.addEventListener('click', (e) => {
      const wrap = e.target.closest('.card-image-wrap');
      if (wrap) {
        const id = wrap.getAttribute('data-id');
        if (id) openPhotoModal(id);
      }
    });

    window.openPhotoModal = openPhotoModal;
    window.closePhotoModal = closePhotoModal;
    window.handlePhotoModalBackdrop = handlePhotoModalBackdrop;

    const policyData = {
      privacy: {
        title: "🔒 Gizlilik Politikası & KVKK Aydınlatma Metni",
        content: `
          <p><strong>1. Veri Sorumlusu:</strong> ZEN ESCORT VIP Platformu (harmoniliski.com), kullanıcılarının ve ziyaretçilerinin kişisel verilerinin güvenliğine en üst düzeyde önem verir.</p>
          <p><strong>2. Toplanan Veriler:</strong> Sitemizi ziyaret ettiğinizde IP adresiniz, cihaz türünüz ve şehir bilginiz yalnızca anonim istatistiki analiz amacıyla işlenir. Kişisel hassas verileriniz üçüncü taraflarla paylaşılmaz veya satılmaz.</p>
          <p><strong>3. İletişim Güvenliği:</strong> Escortlarla kurulan WhatsApp ve telefon iletişimleri uçtan uca şifreli olup, platformumuz bu mesajlaşmaları kaydetmez veya dinlemez.</p>
          <p><strong>4. KVKK Haklarınız:</strong> 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında dilediğiniz zaman verilerinizin silinmesini talep edebilirsiniz.</p>
        `
      },
      terms: {
        title: "📜 Kullanım Koşulları & Hizmet Şartları",
        content: `
          <p><strong>1. Hizmet Niteliği:</strong> ZenEscort, Türkiye genelinde 81 ilde hizmet veren bağımsız ve sertifikalı escortlerin tanıtımını sağlayan bir rehber kataloğudur.</p>
          <p><strong>2. Yaş Sınırı:</strong> Sitemiz yalnızca 18 yaşını doldurmuş yetişkin bireylerin kullanımına açıktır.</p>
          <p><strong>3. Hizmet Kapsamı:</strong> Sitemizde yer alan tüm escortlar klasik seans, özel seans, medikal seans ve spa seansı gibi yasal ve profesyonel rahatlama hizmetleri sunmaktadır.</p>
          <p><strong>4. Randevu ve Anlaşmalar:</strong> Müşteri ile escort arasındaki randevu, seans saati ve ücret mutabakatı doğrudan taraflar arasında gerçekleşir.</p>
        `
      },
      cookies: {
        title: "🍪 Çerez (Cookie) Politikası",
        content: `
          <p><strong>1. Çerez Kullanımı:</strong> Sitemizde en iyi kullanıcı deneyimini sunmak, şehir tercihlerinizi hatırlamak ve sayfa yükleme hızını artırmak amacıyla zorunlu ve işlevsel çerezler kullanılmaktadır.</p>
          <p><strong>2. Çerezleri Yönetme:</strong> Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz.</p>
        `
      },
      disclaimer: {
        title: "🛡️ Yasal Sorumluluk Reddi & Bildirim",
        content: `
          <p><strong>1. Bağımsız İlan Verenler:</strong> Sitede yer alan profil bilgileri, görseller ve iletişim numaraları ilan veren bağımsız escortlarin kendi beyanlarıdır.</p>
          <p><strong>2. Yasal Uygunluk:</strong> Platformumuz yalnızca profesyonel eskort, spa ve seans hizmetlerinin listelenmesine izin verir. Yasalara aykırı içerik tespit edildiğinde anında yayından kaldırılır.</p>
          <p><strong>3. İletişim:</strong> Her türlü telif, bildirim veya destek talebiniz için 7/24 WhatsApp destek hattımızdan bize ulaşabilirsiniz.</p>
        `
      }
    };

    function openPolicyModal(type) {
      const p = policyData[type];
      if (!p) return;
      document.getElementById('policyModalTitle').textContent = p.title;
      document.getElementById('policyModalContent').innerHTML = p.content;
      const m = document.getElementById('policyModal');
      if (m) {
        m.classList.add('active');
        m.style.display = 'flex';
      }
    }

    function closePolicyModal() {
      const m = document.getElementById('policyModal');
      if (m) {
        m.classList.remove('active');
        m.style.display = 'none';
      }
    }

    window.openPolicyModal = openPolicyModal;
    window.closePolicyModal = closePolicyModal;

    function checkUrlCityFilter() {
      const params = new URLSearchParams(window.location.search);
      const city = params.get('city');
      const district = params.get('district');
      if (city) {
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
          Array.from(citySelect.options).forEach(opt => {
            if (opt.value.toLowerCase() === city.toLowerCase()) {
              citySelect.value = opt.value;
              updateDistrictOptions(opt.value);
            }
          });
        }
      }
      if (district) {
        const distSelect = document.getElementById('districtSelect');
        if (distSelect) {
          Array.from(distSelect.options).forEach(opt => {
            if (opt.value.toLowerCase() === district.toLowerCase()) {
              distSelect.value = opt.value;
            }
          });
        }
      }
      if (city || district) {
        filterTherapists();
      }
    }

    async function applySavedSettings() {
      let savedTitle = localStorage.getItem('zenescort_site_title');
      let savedWa = localStorage.getItem('zenescort_wa_number');
      let savedScope = localStorage.getItem('zenescort_scope');

      try {
        const res = await fetch('./settings.json?t=' + Date.now(), { cache: 'no-cache' });
        if (res.ok) {
          const cloudSet = await res.json();
          if (cloudSet) {
            if (cloudSet.siteTitle) savedTitle = cloudSet.siteTitle;
            if (cloudSet.waNumber) savedWa = cloudSet.waNumber;
            if (cloudSet.scope) savedScope = cloudSet.scope;
          }
        }
      } catch(e) {}

      if (savedTitle) {
        document.title = savedTitle;
        
        // Logo başlığı ve alt başlığı
        const logoH1 = document.querySelector('.logo-text h1');
        const logoSpan = document.querySelector('.logo-text span');
        if (savedTitle.includes('|')) {
          const parts = savedTitle.split('|');
          if (logoH1) logoH1.textContent = parts[0].trim();
          if (logoSpan && parts[1]) logoSpan.textContent = parts[1].trim();
        } else {
          if (logoH1) logoH1.textContent = savedTitle;
        }

        // Ana vitrin manşet başlığı
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
          if (savedTitle.includes('|')) {
            const parts = savedTitle.split('|');
            heroTitle.innerHTML = parts[0].trim() + ' <span class="gold-shimmer">' + (parts[1] ? parts[1].trim() : '') + '</span>';
          } else {
            heroTitle.innerHTML = '<span class="gold-shimmer">' + savedTitle + '</span>';
          }
        }
      }

      if (savedWa) {
        const cleanWa = savedWa.replace(/\D/g, '');
        // Üst kayan bant VIP vitrin ilan hattı
        const topbarA = document.querySelector('.vip-topbar a');
        if (topbarA) {
          topbarA.href = "https://api.whatsapp.com/send/?phone=" + cleanWa + "&text=" + encodeURIComponent("Merhaba, sitenize escort vitrin ilanı vermek istiyorum.");
          topbarA.innerHTML = '<span>💬 İlan Verme Hattı:</span> <strong>' + savedWa + '</strong>';
        }
        // 7/24 Canlı Destek Butonu
        const btnContactTop = document.querySelector('.btn-contact-top');
        if (btnContactTop) {
          btnContactTop.href = "https://api.whatsapp.com/send/?phone=" + cleanWa + "&text=" + encodeURIComponent("Merhaba, canli destek hattindan randevu almak istiyorum.");
        }
        // Vitrin İlan Modalı Butonu
        const vitrinModalBtn = document.getElementById('vitrinModalWaLink');
        if (vitrinModalBtn) {
          vitrinModalBtn.href = "https://api.whatsapp.com/send/?phone=" + cleanWa + "&text=" + encodeURIComponent("Merhaba, sitenize escort vitrin ilanı vermek istiyorum.");
        }
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      applySavedSettings();
      trackPageVisit();
      loadLiveTherapists();
      checkUrlCityFilter();
    });
      // PWA banner removed



    // 🌍 MERKEZİ BULUT ZİYARETÇİ VE CANLI AKTİF RADAR SENKRONİZASYONU
        let activeVisitorId=sessionStorage.getItem('zenescort_vis_id')||('v_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,6));
    sessionStorage.setItem('zenescort_vis_id',activeVisitorId);
    let detectedCityName='İstanbul', detectedCountryName='Türkiye';
    let detectedDevice=/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)?'Mobil 📱':'Masaüstü 💻';
    function recordLocalVisitor(activity,isVisit){try{const now=Date.now(),date=new Date(now).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}),time=new Date(now).toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}),page=location.pathname.split('/').pop()||'Ana Sayfa';if(isVisit||!sessionStorage.getItem('zenescort_counted_visit')){sessionStorage.setItem('zenescort_counted_visit','true');const counts=JSON.parse(localStorage.getItem('zenescort_city_counts')||'{}');counts[detectedCityName]=(counts[detectedCityName]||0)+1;localStorage.setItem('zenescort_city_counts',JSON.stringify(counts));const visits=JSON.parse(localStorage.getItem('zenescort_city_visits')||'[]');visits.unshift({time,date,city:detectedCityName,country:detectedCountryName,device:detectedDevice,page});localStorage.setItem('zenescort_city_visits',JSON.stringify(visits.slice(0,60)));}const active=JSON.parse(localStorage.getItem('zenescort_active_visitors')||'[]').filter(v=>now-(v.lastSeen||0)<180000),v={id:activeVisitorId,city:detectedCityName,device:detectedDevice,activity,lastSeen:now,time};const i=active.findIndex(x=>x.id===activeVisitorId);if(i>=0)active[i]=v;else active.unshift(v);localStorage.setItem('zenescort_active_visitors',JSON.stringify(active.slice(0,25)));}catch(e){}}
    (async function initVisitorTracking(){try{let d=null;try{const r=await fetch('https://ipwho.is/');if(r.ok)d=await r.json();}catch(e){}if(d){detectedCityName=d.city||d.region||detectedCityName;detectedCountryName=d.country||d.country_name||detectedCountryName;}recordLocalVisitor('Escort Profillerini İnceliyor',true);setInterval(()=>{if(document.visibilityState==='visible')recordLocalVisitor('Sitede Aktif Geziniyor',false)},25000);}catch(e){recordLocalVisitor('Escort Profillerini İnceliyor',true);}})();