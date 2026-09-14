// MediPoint - iletişim sayaçları + il/ilçe filtreleme
(function () {
  'use strict';

  // ---- 1) WhatsApp / Hemen Ara tıklama sayacı --------------------------
  // Butonun kendi href'i (wa.me / tel:) tarayıcı tarafından normal şekilde
  // işlenir; sendBeacon isteği sayfadan ayrılmayı bloklamadan arka planda gider.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-contact-type]');
    if (!btn) return;

    var payload = JSON.stringify({
      doctor_id: Number(btn.dataset.doctorId),
      type: btn.dataset.contactType
    });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('api/track-contact.php', payload);
      } else {
        fetch('api/track-contact.php', { method: 'POST', body: payload, keepalive: true });
      }
    } catch (err) {
      // Sayaç isteği başarısız olsa bile arama/whatsapp linki çalışmaya devam etmeli.
    }
  });

  // ---- 2) Türkiye'nin 81 ili + popüler ilçe filtreleri -----------------
  var PROVINCES = [
    "Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin",
    "Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur",
    "Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan",
    "Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul",
    "İzmir","Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kırıkkale","Kırklareli",
    "Kırşehir","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş",
    "Nevşehir","Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas",
    "Şanlıurfa","Şırnak","Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"
  ].sort(function (a, b) { return a.localeCompare(b, 'tr'); });

  var POPULAR_DISTRICTS = {
    "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli"],
    "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"],
    "İzmir": ["Alsancak", "Karşıyaka", "Bornova"],
    "Bursa": ["Nilüfer", "Osmangazi"],
    "Antalya": ["Muratpaşa", "Konyaaltı"],
    "Konya": ["Selçuklu", "Meram"]
  };

  var citySelect = document.getElementById('city-select');
  var districtRow = document.getElementById('district-chips');
  var grid = document.getElementById('doctor-grid');
  var emptyState = document.getElementById('grid-empty-state');
  if (!citySelect || !grid) return;

  PROVINCES.forEach(function (il) {
    var opt = document.createElement('option');
    opt.value = il;
    opt.textContent = il;
    citySelect.appendChild(opt);
  });

  var activeCity = '';
  var activeDistrict = '';

  function renderDistrictChips(city) {
    districtRow.innerHTML = '';
    var districts = POPULAR_DISTRICTS[city];
    if (!districts) {
      districtRow.hidden = true;
      return;
    }
    districtRow.hidden = false;
    districts.forEach(function (ilce) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'district-chip';
      chip.textContent = ilce;
      chip.addEventListener('click', function () {
        activeDistrict = (activeDistrict === ilce) ? '' : ilce;
        Array.prototype.forEach.call(districtRow.children, function (c) {
          c.classList.toggle('is-active', c === chip && activeDistrict !== '');
        });
        applyFilter();
      });
      districtRow.appendChild(chip);
    });
  }

  function applyFilter() {
    var cards = grid.querySelectorAll('.doctor-card');
    var visibleCount = 0;
    cards.forEach(function (card) {
      var matchesCity = !activeCity || card.dataset.city === activeCity;
      var matchesDistrict = !activeDistrict || card.dataset.district === activeDistrict;
      var visible = matchesCity && matchesDistrict;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  citySelect.addEventListener('change', function () {
    activeCity = citySelect.value;
    activeDistrict = '';
    renderDistrictChips(activeCity);
    applyFilter();
  });

  var resetBtn = document.getElementById('filter-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      activeCity = '';
      activeDistrict = '';
      citySelect.value = '';
      districtRow.innerHTML = '';
      districtRow.hidden = true;
      applyFilter();
    });
  }
})();
