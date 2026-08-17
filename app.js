/**
 * HARMONİ - BİLİMSEL EŞLEŞTİRME & EVLİLİK PLATFORMU
 * Pembe Panjur Modeli: Karşılama/Reklam (Landing) & Üye İçi Portal Motoru
 */

function bootHarmoniApp() {
  // Oturum ve Uygulama Durumu (Admin Paneli ile %100 Senkronize Veri Tabanı)
  function getSynchronizedProfiles() {
    const deletedProfileIds = JSON.parse(localStorage.getItem('harmoni_deleted_profile_ids') || '[]');
    let adminMembers = JSON.parse(localStorage.getItem('harmoni_admin_members') || 'null');
    const regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    const seedProfiles = (typeof MATCH_PROFILES !== 'undefined' ? MATCH_PROFILES : []).map(p => ({
      ...p,
      status: p.status || 'approved',
      isVIP: p.gender === 'female' ? true : (p.isVIP || false),
      joinDate: p.joinDate || '2026-02-17'
    }));

    let allMembers = [];
    if (adminMembers && Array.isArray(adminMembers) && adminMembers.length > 0) {
      // Admin listesini esas al ve yeni kayıtları ekle
      const existingIds = adminMembers.map(m => m.id);
      const newRegs = regUsers.filter(r => !existingIds.includes(r.id));
      allMembers = [...newRegs, ...adminMembers];
    } else {
      allMembers = [...regUsers, ...seedProfiles];
      localStorage.setItem('harmoni_admin_members', JSON.stringify(allMembers));
    }

    // Silinen ve yasaklanan (banned) profilleri süz
    return allMembers.filter(p => !deletedProfileIds.includes(p.id) && p.status !== 'banned');
  }

  const state = {
    isLoggedIn: JSON.parse(localStorage.getItem('harmoni_auth_session') || 'false'),
    profiles: getSynchronizedProfiles(),
    favorites: JSON.parse(localStorage.getItem('harmoni_favs') || '[]'),
    winks: JSON.parse(localStorage.getItem('harmoni_winks') || '[]'),
    
    // Aktif Kullanıcı
    currentUser: JSON.parse(localStorage.getItem('harmoni_current_user') || JSON.stringify({
      name: "Üye",
      gender: "male",
      age: 30,
      city: "İstanbul",
      profession: "Mühendis",
      bio: "Saygı ve güvene dayalı ciddi bir ilişki arıyorum.",
      isVIP: false,
      vipPlan: null
    })),

    selectedPlanForCheckout: null,
    currentQuizStep: 0,
    userQuizAnswers: [],

    activeFilter: {
      gender: 'all',
      city: 'all',
      ageRange: 'all',
      minComp: 70,
      maritalStatus: 'all',
      education: 'all',
      searchQuery: '',
      sortBy: 'match-score',
      onlyFavorites: false
    },
    activeChatPartner: null,
    chatHistories: JSON.parse(localStorage.getItem('harmoni_chat_histories') || JSON.stringify({
      "user-201": [
        { sender: 'them', text: "Merhaba! Profilini ve %96 karakter uyumumuzu inceledim. Tanışmak çok güzel 😊" }
      ]
    }))
  };

  // DOM Referansları
  const DOM = {
    // Landing & Portal Görünümleri
    landingSection: document.getElementById('landingSection'),
    membersPortalBanner: document.getElementById('membersPortalBanner'),
    portalWelcomeUserName: document.getElementById('portalWelcomeUserName'),
    guestHeaderActions: document.getElementById('guestHeaderActions'),
    memberHeaderActions: document.getElementById('memberHeaderActions'),
    
    // Auth Butonları
    btnOpenLoginModal: document.getElementById('btnOpenLoginModal'),
    btnOpenRegisterModal: document.getElementById('btnOpenRegisterModal'),
    btnLogout: document.getElementById('btnLogout'),
    loginModal: document.getElementById('loginModal'),
    btnCloseLoginModal: document.getElementById('btnCloseLoginModal'),
    loginForm: document.getElementById('loginForm'),
    heroRegisterForm: document.getElementById('heroRegisterForm'),
    linkSwitchToLogin: document.getElementById('linkSwitchToLogin'),
    linkSwitchToRegister: document.getElementById('linkSwitchToRegister'),
    heroGenderFemale: document.getElementById('heroGenderFemale'),
    heroGenderMale: document.getElementById('heroGenderMale'),

    // İç Portal Elemanları
    profileGrid: document.getElementById('profileGrid'),
    matchesCountDisplay: document.getElementById('matchesCountDisplay'),
    storiesGrid: document.getElementById('storiesGrid'),
    favCount: document.getElementById('favCount'),
    winkCount: document.getElementById('winkCount'),
    inboxCount: document.getElementById('inboxCount'),
    
    // Header
    btnOpenFavorites: document.getElementById('btnOpenFavorites'),
    btnWinkList: document.getElementById('btnWinkList'),
    btnOpenInbox: document.getElementById('btnOpenInbox'),
    btnOpenMyProfile: document.getElementById('btnOpenMyProfile'),
    btnOpenVipModal: document.getElementById('btnOpenVipModal'),
    navVipPlans: document.getElementById('navVipPlans'),
    headerUserName: document.getElementById('headerUserName'),
    headerUserBadge: document.getElementById('headerUserBadge'),
    headerVipBtnText: document.getElementById('headerVipBtnText'),

    // Filtreler
    filterSearch: document.getElementById('filterSearch'),
    filterGender: document.getElementById('filterGender'),
    filterCity: document.getElementById('filterCity'),
    filterMinComp: document.getElementById('filterMinComp'),
    compValueDisplay: document.getElementById('compValueDisplay'),
    filterMarital: document.getElementById('filterMarital'),
    filterEducation: document.getElementById('filterEducation'),
    filterVerifiedOnly: document.getElementById('filterVerifiedOnly'),
    btnResetFilters: document.getElementById('btnResetFilters'),
    sortBySelect: document.getElementById('sortBySelect'),

    // Quiz
    btnOpenQuizModal: document.getElementById('btnOpenQuizModal'),
    quizModal: document.getElementById('quizModal'),
    btnCloseQuizModal: document.getElementById('btnCloseQuizModal'),
    quizQuestionTitle: document.getElementById('quizQuestionTitle'),
    quizOptionsContainer: document.getElementById('quizOptionsContainer'),
    quizStepCounter: document.getElementById('quizStepCounter'),

    // VIP & Ödeme
    vipModal: document.getElementById('vipModal'),
    btnCloseVipModal: document.getElementById('btnCloseVipModal'),
    vipPlansContainer: document.getElementById('vipPlansContainer'),
    checkoutModal: document.getElementById('checkoutModal'),
    btnCloseCheckoutModal: document.getElementById('btnCloseCheckoutModal'),
    checkoutPlanTitle: document.getElementById('checkoutPlanTitle'),
    checkoutPlanPrice: document.getElementById('checkoutPlanPrice'),
    checkoutForm: document.getElementById('checkoutForm'),

    // Diğer Modallar
    profileDetailModal: document.getElementById('profileDetailModal'),
    detailModalContent: document.getElementById('detailModalContent'),
    btnCloseDetailModal: document.getElementById('btnCloseDetailModal'),
    chatModal: document.getElementById('chatModal'),
    btnCloseChatModal: document.getElementById('btnCloseChatModal'),
    chatPartnerAvatar: document.getElementById('chatPartnerAvatar'),
    chatPartnerName: document.getElementById('chatPartnerName'),
    chatPartnerScore: document.getElementById('chatPartnerScore'),
    chatMessagesBody: document.getElementById('chatMessagesBody'),
    chatIcebreakersTray: document.getElementById('chatIcebreakersTray'),
    chatForm: document.getElementById('chatForm'),
    chatInputMessage: document.getElementById('chatInputMessage'),
    inboxModal: document.getElementById('inboxModal'),
    btnCloseInboxModal: document.getElementById('btnCloseInboxModal'),
    inboxListContainer: document.getElementById('inboxListContainer'),
    winksModal: document.getElementById('winksModal'),
    btnCloseWinksModal: document.getElementById('btnCloseWinksModal'),
    winksListContainer: document.getElementById('winksListContainer'),
    myProfileModal: document.getElementById('myProfileModal'),
    btnCloseMyProfileModal: document.getElementById('btnCloseMyProfileModal'),
    myProfileForm: document.getElementById('myProfileForm'),
    genderCardMale: document.getElementById('genderCardMale'),
    genderCardFemale: document.getElementById('genderCardFemale'),
    feedbackModal: document.getElementById('feedbackModal'),
    btnCloseFeedbackModal: document.getElementById('btnCloseFeedbackModal'),
    feedbackForm: document.getElementById('feedbackForm'),
    registerModal: document.getElementById('registerModal'),
    btnCloseRegisterModal: document.getElementById('btnCloseRegisterModal'),
    modalRegisterForm: document.getElementById('modalRegisterForm'),
    legalModal: document.getElementById('legalModal'),
    btnCloseLegalModal: document.getElementById('btnCloseLegalModal'),
    toastContainer: document.getElementById('toastContainer')
  };

  init();

  function init() {
    trackRealVisit(state.isLoggedIn ? "Oturum Açık Ziyaret" : "Ziyaretçi Girişi (Landing Reklam Sayfası)");
    applyAuthStateUI();
    renderVipPlans();
    setupPembePanjurPaymentEvents();
    renderSuccessStories();
    renderProfiles();
    attachEventListeners();
  }

  // Oturum Durumuna Göre Arayüzü Ayarlama (Landing vs Üye Portalı)
  function applyAuthStateUI() {
    if (state.isLoggedIn) {
      // ÜYE GİRİŞİ YAPILMIŞ: İç portal görünür, landing hero gizlenir
      if (DOM.landingSection) DOM.landingSection.style.display = 'none';
      if (DOM.membersPortalBanner) DOM.membersPortalBanner.style.display = 'flex';
      if (DOM.guestHeaderActions) DOM.guestHeaderActions.style.display = 'none';
      if (DOM.memberHeaderActions) DOM.memberHeaderActions.style.display = 'flex';
      if (DOM.portalWelcomeUserName) DOM.portalWelcomeUserName.textContent = state.currentUser.name.split(' ')[0];
      updateUserMembershipUI();
    } else {
      // ZİYARETÇİ MODU: Landing reklam/kayıt sayfası görünür
      if (DOM.landingSection) DOM.landingSection.style.display = 'block';
      if (DOM.membersPortalBanner) DOM.membersPortalBanner.style.display = 'none';
      if (DOM.guestHeaderActions) DOM.guestHeaderActions.style.display = 'flex';
      if (DOM.memberHeaderActions) DOM.memberHeaderActions.style.display = 'none';
    }
  }

  // Gerçek Ziyaretçi ve Etkileşim Kaydı (Canlı Analitik)
  function trackRealVisit(actionName) {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const device = isMobile ? "📱 Mobil" : "💻 Masaüstü";
      const browser = navigator.userAgent.includes("Chrome") ? "Chrome" : (navigator.userAgent.includes("Safari") ? "Safari" : "Tarayıcı");

      let totalVisits = parseInt(localStorage.getItem('harmoni_real_total_visits') || '0') + 1;
      localStorage.setItem('harmoni_real_total_visits', totalVisits.toString());

      let logs = JSON.parse(localStorage.getItem('harmoni_real_visitor_logs') || '[]');
      logs.unshift({
        id: Date.now(),
        date: `${dateStr} ${timeStr}`,
        action: actionName,
        device: `${device} (${browser})`,
        status: "🟢 Aktif"
      });

      if (logs.length > 50) logs = logs.slice(0, 50);
      localStorage.setItem('harmoni_real_visitor_logs', JSON.stringify(logs));
    } catch(e) {}
  }

  // Kullanıcı Üyelik Durumunu Arayüze Yansıtma (Kadın / Erkek / VIP)
  function updateUserMembershipUI() {
    const user = state.currentUser;
    if (!user) return;

    if (DOM.headerUserName) DOM.headerUserName.textContent = user.name.split(' ')[0];

    if (user.gender === 'female') {
      if (DOM.headerUserBadge) {
        DOM.headerUserBadge.textContent = "KADIN (ÜCRETSİZ VIP)";
        DOM.headerUserBadge.className = "gender-membership-badge female";
      }
      if (DOM.btnOpenVipModal) DOM.btnOpenVipModal.style.display = "none";
    } else {
      if (user.isVIP) {
        if (DOM.headerUserBadge) {
          DOM.headerUserBadge.textContent = "👑 GOLD VIP";
          DOM.headerUserBadge.className = "gender-membership-badge male-vip";
        }
        if (DOM.headerVipBtnText) DOM.headerVipBtnText.textContent = "VIP Aktif";
      } else {
        if (DOM.headerUserBadge) {
          DOM.headerUserBadge.textContent = "STANDART";
          DOM.headerUserBadge.className = "gender-membership-badge male-free";
        }
        if (DOM.headerVipBtnText) DOM.headerVipBtnText.textContent = "VIP Üye Ol";
        if (DOM.btnOpenVipModal) DOM.btnOpenVipModal.style.display = "flex";
      }
    }

    if (DOM.favCount) DOM.favCount.textContent = state.favorites.length;
    if (DOM.winkCount) DOM.winkCount.textContent = state.winks.length;
    if (DOM.inboxCount) DOM.inboxCount.textContent = Object.keys(state.chatHistories).length;
  }

  // Pembe Panjur Stili Gold Üyelik & Ödeme Motoru
  let activeSelectedPlan = VIP_PACKAGES[1] || VIP_PACKAGES[0]; // Varsayılan 3 Aylık

  function renderVipPlans() {
    const selectorContainer = document.getElementById('ppPackageSelector');
    if (!selectorContainer || typeof VIP_PACKAGES === 'undefined') return;

    selectorContainer.innerHTML = VIP_PACKAGES.map(pkg => `
      <div class="pp-plan-row ${pkg.id === activeSelectedPlan.id ? 'selected' : ''}" data-pkg-id="${pkg.id}">
        <div class="pp-radio-custom"></div>
        <div class="pp-plan-info">
          <div class="pp-plan-name-wrap">
            <span class="pp-plan-title">${pkg.name}</span>
            ${pkg.popular ? `<span class="pp-plan-save-tag">${pkg.badge}</span>` : ''}
          </div>
          <div class="pp-plan-sub">${pkg.desc} • ${pkg.priceMonthly || ''}</div>
        </div>
        <div class="pp-plan-price">${pkg.price}</div>
      </div>
    `).join('');

    // Buton Fiyat Güncellemesi
    const submitBtn = document.getElementById('btnSubmitCardPayment');
    if (submitBtn) {
      submitBtn.innerHTML = `<span>🔒 ${activeSelectedPlan.price} Güvenli Ödeme Yap ve Gold Üyeliği Başlat</span>`;
    }

    // Paket Seçimi
    selectorContainer.querySelectorAll('.pp-plan-row').forEach(row => {
      row.addEventListener('click', () => {
        const pkgId = row.dataset.pkgId;
        const plan = VIP_PACKAGES.find(p => p.id === pkgId);
        if (plan) {
          activeSelectedPlan = plan;
          renderVipPlans();
        }
      });
    });
  }

  function setupPembePanjurPaymentEvents() {
    // Sekme Geçişi
    const tabCard = document.getElementById('tabMethodCard');
    const tabBank = document.getElementById('tabMethodBank');
    const cardForm = document.getElementById('ppCardPaymentForm');
    const bankSection = document.getElementById('ppBankPaymentSection');

    tabCard?.addEventListener('click', () => {
      tabCard.classList.add('active');
      tabBank.classList.remove('active');
      if (cardForm) cardForm.style.display = 'flex';
      if (bankSection) bankSection.style.display = 'none';
    });

    tabBank?.addEventListener('click', () => {
      tabBank.classList.add('active');
      tabCard.classList.remove('active');
      if (cardForm) cardForm.style.display = 'none';
      if (bankSection) bankSection.style.display = 'flex';
    });

    // Kredi Kartı ile Ödeme
    cardForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      processSuccessfulPayment('Kredi Kartı');
    });

    // Havale / EFT Bildirimi
    document.getElementById('btnNotifyBankPayment')?.addEventListener('click', () => {
      processSuccessfulPayment('Havale / EFT');
    });
  }

  function processSuccessfulPayment(method) {
    const planName = activeSelectedPlan ? activeSelectedPlan.name : '3 Aylık Gold VIP';
    const planPrice = activeSelectedPlan ? activeSelectedPlan.priceRaw : 599;

    state.currentUser.isVIP = true;
    state.currentUser.vipPlan = activeSelectedPlan ? activeSelectedPlan.id : 'gold';
    localStorage.setItem('harmoni_current_user', JSON.stringify(state.currentUser));

    let totalRev = parseInt(localStorage.getItem('harmoni_real_vip_revenue') || '0') + planPrice;
    localStorage.setItem('harmoni_real_vip_revenue', totalRev.toString());

    trackRealVisit(`💰 Gold Üyelik Satın Alındı (${planName} - ${planPrice} ₺ via ${method})`);

    closeModal(DOM.vipModal);
    window.closeModalById('vipModal');
    updateUserMembershipUI();
    renderProfiles();
    playChime();
    showToast(`🎉 Tebrikler! ${planName} üyeliğiniz başarıyla aktif edildi. Artık tüm kadın üyelerle dilediğinizce mesajlaşabilirsiniz!`);
  }

  // Ses Efekti - Tek tanım (ikinci kopya app.js'in ilerleyen kısımlarında da vardı, o kaldırılacak)

  // Başarı Hikayeleri
  function renderSuccessStories() {
    if (!DOM.storiesGrid || typeof SUCCESS_STORIES === 'undefined') return;
    DOM.storiesGrid.innerHTML = SUCCESS_STORIES.map(st => `
      <div style="background:#121826; border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
        <img src="${st.image}" style="width:100%; aspect-ratio:16/9; object-fit:cover;">
        <div style="padding:1.5rem;">
          <h4 style="font-family:var(--font-heading); font-size:1.2rem; font-weight:800; color:#FFFFFF;">${st.couple} • ${st.city}</h4>
          <span style="font-size:0.78rem; color:var(--primary-rose); font-weight:700; display:block; margin-bottom:0.6rem;">${st.marriedDate}</span>
          <p style="font-size:0.88rem; color:#94A3B8; line-height:1.6; font-style:italic;">"${st.quote}"</p>
        </div>
      </div>
    `).join('');
  }

  // Pembe Panjur Canlı Çevrimiçi Üyeler Şeridi
  function renderOnlineStrip() {
    const row = document.getElementById('ppOnlineAvatarsRow');
    const liveCountBadge = document.getElementById('ppLiveCount');
    if (!row) return;

    const onlineCandidates = state.profiles.filter(p => p.isOnline);
    if (liveCountBadge) liveCountBadge.textContent = `${onlineCandidates.length} Canlı Üye`;

    row.innerHTML = onlineCandidates.map(p => `
      <div class="pp-story-item" data-profile-id="${p.id}">
        <div class="pp-story-avatar-wrap">
          <img src="${p.avatar}" alt="${p.name}" class="pp-story-avatar">
          <span class="pp-story-dot"></span>
        </div>
        <span class="pp-story-name">${p.name}</span>
      </div>
    `).join('');

    row.querySelectorAll('.pp-story-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!state.isLoggedIn) {
          DOM.landingSection?.scrollIntoView({ behavior: 'smooth' });
          showToast("✨ Çevrimiçi adaylarla mesajlaşmak için lütfen ücretsiz üye olun.");
        } else {
          openProfileDetail(item.dataset.profileId);
        }
      });
    });
  }

  // Profil Filtreleme (Güvenli & Hatasız)
  function getFilteredProfiles() {
    let list = [...state.profiles];

    if (state.activeFilter.onlyFavorites) {
      list = list.filter(p => state.favorites.includes(p.id));
    }
    if (state.activeFilter.onlineStatus === 'online-only') {
      list = list.filter(p => p.isOnline);
    } else if (state.activeFilter.onlineStatus === 'offline-only') {
      list = list.filter(p => !p.isOnline);
    }
    if (state.activeFilter.gender !== 'all') {
      list = list.filter(p => p.gender === state.activeFilter.gender);
    }
    if (state.activeFilter.city !== 'all') {
      list = list.filter(p => (p.city || '').toLowerCase() === state.activeFilter.city.toLowerCase());
    }
    if (state.activeFilter.ageRange !== 'all') {
      const [minAge, maxAge] = state.activeFilter.ageRange.split('-').map(Number);
      if (minAge && maxAge) list = list.filter(p => (p.age || 25) >= minAge && (p.age || 25) <= maxAge);
    }
    if (state.activeFilter.minComp > 70) {
      list = list.filter(p => (p.matchScore || 95) >= state.activeFilter.minComp);
    }
    if (state.activeFilter.maritalStatus !== 'all') {
      list = list.filter(p => p.maritalStatus === state.activeFilter.maritalStatus);
    }
    if (state.activeFilter.education !== 'all') {
      list = list.filter(p => p.education && p.education.toLowerCase().includes(state.activeFilter.education.toLowerCase()));
    }
    if (state.activeFilter.searchQuery.trim()) {
      const q = state.activeFilter.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.profession && p.profession.toLowerCase().includes(q)) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        (p.bio && p.bio.toLowerCase().includes(q))
      );
    }

    switch (state.activeFilter.sortBy) {
      case 'online-first': list.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0)); break;
      case 'age-asc': list.sort((a, b) => (a.age || 25) - (b.age || 25)); break;
      case 'age-desc': list.sort((a, b) => (b.age || 25) - (a.age || 25)); break;
      case 'name': list.sort((a, b) => (a.name || '').localeCompare((b.name || ''), 'tr')); break;
      case 'match-score':
      default: list.sort((a, b) => (b.matchScore || 90) - (a.matchScore || 90)); break;
    }

    return list;
  }

  // Profil Kartlarını Render Etme (Pembe Panjur Stili Rozetler)
  function renderProfiles() {
    renderOnlineStrip();
    if (!DOM.profileGrid) return;
    const list = getFilteredProfiles();
    if (DOM.matchesCountDisplay) DOM.matchesCountDisplay.textContent = list.length;

    if (list.length === 0) {
      DOM.profileGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 2rem; background:#121826; border-radius:18px; border:1px solid rgba(255,255,255,0.08); box-shadow:0 12px 32px rgba(0,0,0,0.5);">
          <div style="font-size:3rem; margin-bottom:1rem;">🛡️</div>
          <h3 style="font-family:var(--font-heading); font-size:1.5rem; font-weight:800; color:#FFFFFF; margin-bottom:0.6rem;">Filtrenize Uygun Aday Bulunamadı</h3>
          <p style="color:#94A3B8; font-size:0.95rem; max-width:540px; margin:0 auto 1.75rem; line-height:1.6;">
            Filtreleme kriterlerinizi genişleterek daha fazla adaya ulaşabilir veya tüm üyeleri görüntüleyebilirsiniz.
          </p>
          <button class="btn-register-trigger" id="btnResetAllInEmpty" style="padding:0.75rem 1.75rem; font-size:0.95rem; margin:0 auto; display:inline-flex; align-items:center; gap:0.5rem; cursor:pointer;">
            <span>🔄 Tüm Filtreleri Temizle</span>
          </button>
        </div>
      `;
      document.getElementById('btnResetAllInEmpty')?.addEventListener('click', resetAllFilters);
      return;
    }

    const isMember = state.isLoggedIn;

    DOM.profileGrid.innerHTML = list.map(profile => {
      const isFav = state.favorites.includes(profile.id);
      const isWinked = state.winks.includes(profile.id);

      return `
        <article class="profile-card ${!isMember ? 'locked' : ''}" data-profile-id="${profile.id}">
          <div class="profile-card-image-wrap">
            <img src="${profile.avatar}" alt="${profile.name}" class="profile-card-image" loading="lazy">
            
            ${!isMember ? `
              <div class="teaser-lock-overlay">
                <span class="teaser-lock-badge" data-trigger-auth="true">
                  <span>🔒 Üyelere Özel Fotoğraf</span>
                </span>
                <span style="font-size:0.75rem; color:#FDA4AF; margin-top:0.5rem; font-weight:700;">Görmek İçin Ücretsiz Üye Olun</span>
              </div>
            ` : ''}

            <!-- Pembe Panjur Canlı Durum Rozeti -->
            <div class="pp-card-status-badge ${profile.isOnline ? 'online' : 'offline'}">
              <span class="pp-status-dot"></span>
              <span>${profile.isOnline ? 'Çevrimiçi' : (profile.lastActive || 'Çevrimdışı')}</span>
            </div>

            <!-- Pembe Panjur Uyum Yüzdesi -->
            <div class="pp-match-score-badge">
              <span>%${profile.matchScore} Uyum</span>
            </div>
            
            ${isMember ? `
              <button class="btn-card-favorite ${isFav ? 'active' : ''}" data-fav-id="${profile.id}" title="Favorilere Ekle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            ` : ''}
          </div>

          <div class="profile-card-body">
            <div class="profile-name-row">
              <h3 class="profile-card-name">${profile.name}, ${profile.age}</h3>
              <span class="profile-card-location">📍 ${profile.city}</span>
            </div>
            <div class="profile-card-job">
              <span>💼 ${profile.profession}</span>
            </div>
            <p class="profile-card-bio">"${profile.bio}"</p>

            <div class="profile-card-actions">
              ${isMember ? `
                <button class="btn-wink ${isWinked ? 'active' : ''}" data-wink-id="${profile.id}">
                  <span>😉 ${isWinked ? 'Göz Kırpıldı' : 'Göz Kırp'}</span>
                </button>
                <button class="btn-chat-trigger ${state.currentUser.gender === 'male' && !state.currentUser.isVIP ? 'vip-lock-btn' : ''}" data-chat-id="${profile.id}">
                  <span>${state.currentUser.gender === 'male' && !state.currentUser.isVIP ? '👑 Mesaj At (VIP)' : '💬 Mesaj At'}</span>
                </button>
              ` : `
                <button class="btn-find-matches" style="grid-column:1 / -1; padding:0.65rem; font-size:0.84rem; justify-content:center;" data-trigger-auth="true">
                  <span>✨ Profille Tanışmak İçin Üye Ol</span>
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Tıklama Olayları
    DOM.profileGrid.querySelectorAll('[data-trigger-auth]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.landingSection?.scrollIntoView({ behavior: 'smooth' });
        showToast("✨ Adayların fotoğraflarını görmek ve mesajlaşmak için lütfen ücretsiz üye olun.");
      });
    });

    if (isMember) {
      DOM.profileGrid.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.btn-card-favorite') && !e.target.closest('.btn-wink') && !e.target.closest('.btn-chat-trigger')) {
            openProfileDetail(card.dataset.profileId);
          }
        });
      });

      DOM.profileGrid.querySelectorAll('.btn-card-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(btn.dataset.favId);
        });
      });

      DOM.profileGrid.querySelectorAll('.btn-wink').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sendWink(btn.dataset.winkId);
        });
      });

      DOM.profileGrid.querySelectorAll('.btn-chat-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleChatAccess(btn.dataset.chatId);
        });
      });
    }
  }

  // Cinsiyete Dayalı Mesajlaşma İzni Kontrolü (Paywall Enforcement)
  function handleChatAccess(profileId) {
    if (!state.isLoggedIn) {
      DOM.landingSection?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const user = state.currentUser;
    if (user.gender === 'female') {
      openChatModal(profileId);
      return;
    }

    if (user.gender === 'male' && user.isVIP) {
      openChatModal(profileId);
    } else {
      showToast("🔒 Erkek üyelerin kadın üyelerle mesajlaşabilmesi için VIP Üyelik gereklidir.");
      openModal(DOM.vipModal);
    }
  }

  // Profil Detay (Pembe Panjur Stili Bilimsel Karakter Analizi & Künye)
  function openProfileDetail(profileId) {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;

    const comp = profile.compatibility || { values: 96, lifestyle: 92, communication: 94 };

    DOM.detailModalContent.innerHTML = `
      <div style="background:#07090E; padding:1.75rem; display:flex; flex-direction:column; gap:1.25rem; border-right:1px solid rgba(255,255,255,0.08); width:320px; flex-shrink:0;">
        <img src="${profile.avatar}" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:14px; border:1.5px solid rgba(255,255,255,0.15);">
        
        <!-- Pembe Panjur Hızlı Künye -->
        <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.82rem; color:#94A3B8; background:#121826; padding:1rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
          <div>📏 <strong>Boy:</strong> ${profile.height || 170} cm</div>
          <div>🎓 <strong>Eğitim:</strong> ${profile.education || 'Lisans'}</div>
          <div>💍 <strong>Medeni Durum:</strong> ${profile.maritalStatus || 'Hiç Evlenmemiş'}</div>
          <div>👶 <strong>Çocuk:</strong> ${profile.hasChildren || 'Yok'} (${profile.wantsChildren || 'İstiyor'})</div>
          <div>🚭 <strong>Sigara:</strong> ${profile.smoking || 'Kullanmıyor'}</div>
          <div>✨ <strong>Burç:</strong> ${profile.zodiac || 'Başak'}</div>
        </div>
      </div>

      <div style="padding:2.25rem; display:flex; flex-direction:column; background:#121826; flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
          <h2 style="font-family:var(--font-heading); font-size:1.9rem; font-weight:900; color:#FFFFFF;">${profile.name}, ${profile.age}</h2>
          <span style="background:rgba(244,63,94,0.15); color:#FDA4AF; border:1px solid rgba(244,63,94,0.3); font-size:0.82rem; font-weight:800; padding:5px 12px; border-radius:9999px;">🎯 %${profile.matchScore} Karakter Uyumu</span>
        </div>
        
        <div style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:1.25rem;">📍 ${profile.city} (${profile.district || 'Merkez'}) • 💼 ${profile.profession}</div>
        <p style="font-size:0.92rem; color:#CBD5E1; line-height:1.65; margin-bottom:1.5rem;">${profile.bio}</p>

        <!-- Pembe Panjur Bilimsel Uyum Barları -->
        <div style="background:#0B0F19; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <h4 style="font-family:var(--font-heading); font-size:0.88rem; font-weight:800; color:#FFFFFF; margin-bottom:0.85rem; text-transform:uppercase; letter-spacing:0.05em;">🧠 Bilimsel Eşleştirme Raporu</h4>
          
          <div style="display:flex; flex-direction:column; gap:0.65rem; font-size:0.8rem;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem; color:#94A3B8;">
                <span>Ortak Değerler & İnançlar</span>
                <strong style="color:var(--primary-rose);">%${comp.values}</strong>
              </div>
              <div style="width:100%; height:6px; background:#1E293B; border-radius:9999px; overflow:hidden;">
                <div style="width:${comp.values}%; height:100%; background:linear-gradient(90deg, #F43F5E, #FB7185); border-radius:9999px;"></div>
              </div>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem; color:#94A3B8;">
                <span>Yaşam Tarzı & Alışkanlıklar</span>
                <strong style="color:var(--accent-gold);">%${comp.lifestyle}</strong>
              </div>
              <div style="width:100%; height:6px; background:#1E293B; border-radius:9999px; overflow:hidden;">
                <div style="width:${comp.lifestyle}%; height:100%; background:linear-gradient(90deg, #F59E0B, #FCD34D); border-radius:9999px;"></div>
              </div>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem; color:#94A3B8;">
                <span>İletişim & Duygusal Uyum</span>
                <strong style="color:#10B981;">%${comp.communication}</strong>
              </div>
              <div style="width:100%; height:6px; background:#1E293B; border-radius:9999px; overflow:hidden;">
                <div style="width:${comp.communication}%; height:100%; background:linear-gradient(90deg, #10B981, #34D399); border-radius:9999px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Değerler & Hobiler Etiketleri -->
        <div style="display:flex; flex-wrap:wrap; gap:0.45rem; margin-bottom:1.75rem;">
          ${(profile.values || []).map(v => `<span style="background:rgba(244,63,94,0.12); color:#FDA4AF; border:1px solid rgba(244,63,94,0.25); font-size:0.75rem; font-weight:700; padding:3px 9px; border-radius:6px;">✨ ${v}</span>`).join('')}
          ${(profile.hobbies || []).map(h => `<span style="background:#1E293B; color:#CBD5E1; border:1px solid rgba(255,255,255,0.08); font-size:0.75rem; font-weight:700; padding:3px 9px; border-radius:6px;">🎯 ${h}</span>`).join('')}
        </div>

        <div style="display:flex; gap:0.85rem; margin-top:auto;">
          <button class="btn-wink" id="btnDetailWink" style="flex:1; padding:0.9rem;">😉 Göz Kırp</button>
          <button class="btn-chat-trigger" id="btnDetailChat" style="flex:2; padding:0.9rem;">💬 Mesaj Gönder</button>
        </div>
      </div>
    `;

    document.getElementById('btnDetailWink')?.addEventListener('click', () => sendWink(profile.id));
    document.getElementById('btnDetailChat')?.addEventListener('click', () => {
      closeModal(DOM.profileDetailModal);
      handleChatAccess(profile.id);
    });

    openModal(DOM.profileDetailModal);
  }

  // Göz Kırpma
  function sendWink(profileId) {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;

    if (!state.winks.includes(profileId)) {
      state.winks.push(profileId);
      localStorage.setItem('harmoni_winks', JSON.stringify(state.winks));
      updateUserMembershipUI();
      renderProfiles();
      playChime();
      showToast(`😉 ${profile.name} adlı üyeye göz kırptınız!`);
    } else {
      showToast(`ℹ️ ${profile.name} adlı üyeye daha önce göz kırptınız.`);
    }
  }

  // Favoriler
  function toggleFavorite(profileId) {
    const idx = state.favorites.indexOf(profileId);
    if (idx > -1) state.favorites.splice(idx, 1);
    else state.favorites.push(profileId);

    localStorage.setItem('harmoni_favs', JSON.stringify(state.favorites));
    updateUserMembershipUI();
    renderProfiles();
    showToast(state.favorites.includes(profileId) ? '💖 Favorilere eklendi.' : '💔 Favorilerden çıkarıldı.');
  }

  // Canlı Sohbet (Erkeklere VIP Zorunlu, Otomatik Cevaplar Kaldırıldı)
  function openChatModal(profileId) {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;

    // Erkek üye ise ve VIP değilse doğrudan VIP Satın Alma Modalı açılsın
    if (state.currentUser && state.currentUser.gender === 'male' && !state.currentUser.isVIP) {
      openModal(DOM.vipModal);
      showToast("👑 Erkek üyelerimizin kadın üyelerle mesajlaşabilmesi için VIP Gold üyeliğe geçmesi gerekmektedir.");
      return;
    }

    state.activeChatPartner = profile;
    DOM.chatPartnerAvatar.src = profile.avatar;
    DOM.chatPartnerName.textContent = `${profile.name}, ${profile.age}`;
    DOM.chatPartnerScore.textContent = profile.matchScore;

    if (!state.chatHistories[profile.id]) {
      state.chatHistories[profile.id] = [];
      localStorage.setItem('harmoni_chat_histories', JSON.stringify(state.chatHistories));
    }

    renderChatMessages();

    DOM.chatIcebreakersTray.innerHTML = (profile.icebreakers || ["Merhaba, tanışabilir miyiz?", "Günün nasıl geçiyor?"]).map(q => `
      <button class="btn-icebreaker" data-text="${q}">${q}</button>
    `).join('');

    DOM.chatIcebreakersTray.querySelectorAll('.btn-icebreaker').forEach(btn => {
      btn.addEventListener('click', () => sendMessage(btn.dataset.text));
    });

    openModal(DOM.chatModal);
    setTimeout(() => DOM.chatInputMessage.focus(), 150);
  }

  function renderChatMessages() {
    if (!state.activeChatPartner) return;
    const history = state.chatHistories[state.activeChatPartner.id] || [];
    
    if (history.length === 0) {
      DOM.chatMessagesBody.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; color:#94A3B8; font-size:0.85rem;">
          💬 ${state.activeChatPartner.name} ile henüz bir mesajınız yok. İlk mesajı siz gönderin!
        </div>
      `;
      return;
    }

    DOM.chatMessagesBody.innerHTML = history.map(msg => `
      <div class="chat-bubble ${msg.sender}">${msg.text}</div>
    `).join('');
    DOM.chatMessagesBody.scrollTop = DOM.chatMessagesBody.scrollHeight;
  }

  function sendMessage(text) {
    if (!text.trim() || !state.activeChatPartner) return;

    // Erkek üye ise ve VIP değilse engelle
    if (state.currentUser && state.currentUser.gender === 'male' && !state.currentUser.isVIP) {
      closeModal(DOM.chatModal);
      openModal(DOM.vipModal);
      showToast("👑 Mesaj gönderebilmek için lütfen bir VIP paket seçin.");
      return;
    }

    const partner = state.activeChatPartner;
    if (!state.chatHistories[partner.id]) state.chatHistories[partner.id] = [];

    state.chatHistories[partner.id].push({ sender: 'me', text: text.trim(), time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) });
    localStorage.setItem('harmoni_chat_histories', JSON.stringify(state.chatHistories));
    updateUserMembershipUI();
    renderChatMessages();
    DOM.chatInputMessage.value = '';
    showToast("✓ Mesajınız iletildi.");
  }

  // Karakter Testi
  function startQuiz() {
    if (typeof PERSONALITY_QUIZ_QUESTIONS === 'undefined') return;
    state.currentQuizStep = 0;
    state.userQuizAnswers = [];
    renderQuizStep();
    openModal(DOM.quizModal);
  }

  function renderQuizStep() {
    const q = PERSONALITY_QUIZ_QUESTIONS[state.currentQuizStep];
    DOM.quizQuestionTitle.textContent = q.title;
    DOM.quizStepCounter.textContent = `Soru ${state.currentQuizStep + 1} / ${PERSONALITY_QUIZ_QUESTIONS.length}`;

    DOM.quizOptionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="filter-control quiz-opt-btn" style="text-align:left; padding:0.95rem 1.15rem; background:#1A2234; border:1px solid rgba(255,255,255,0.08); border-radius:10px; cursor:pointer;" data-idx="${idx}">
        <span style="font-weight:600; color:#FFFFFF;">${opt.text}</span>
      </button>
    `).join('');

    DOM.quizOptionsContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.userQuizAnswers.push(q.options[btn.dataset.idx]);
        if (state.currentQuizStep < PERSONALITY_QUIZ_QUESTIONS.length - 1) {
          state.currentQuizStep++;
          renderQuizStep();
        } else {
          finishQuiz();
        }
      });
    });
  }

  function finishQuiz() {
    closeModal(DOM.quizModal);
    playChime();
    showToast("🎉 Karakter testiniz tamamlandı! Eşleşme uyumluluk puanlarınız güncellendi.");
    state.profiles.forEach(p => {
      p.matchScore = Math.min(99, p.matchScore + Math.floor(Math.random() * 4));
    });
    renderProfiles();
  }

  // Modallar
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.style.setProperty('display', 'flex', 'important');
    modalEl.style.setProperty('opacity', '1', 'important');
    modalEl.style.setProperty('visibility', 'visible', 'important');
    modalEl.style.setProperty('pointer-events', 'auto', 'important');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.style.setProperty('display', 'none', 'important');
    modalEl.style.setProperty('opacity', '0', 'important');
    modalEl.style.setProperty('visibility', 'hidden', 'important');
    modalEl.style.setProperty('pointer-events', 'none', 'important');
    document.body.style.overflow = '';
  }

  window.openLoginModal = () => openModal(DOM.loginModal);
  window.openRegisterModal = () => openModal(DOM.registerModal);
  window.openVipModal = () => openModal(DOM.vipModal);
  window.openMyProfile = () => openModal(DOM.myProfileModal);
  window.openInboxModal = () => openModal(DOM.inboxModal);
  window.openWinksModal = () => openModal(DOM.winksModal);
  window.openQuizModal = () => startQuiz();
  window.closeAllModals = () => closeAllModals();
  window.closeModalById = (id) => closeModal(document.getElementById(id));

  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch(e) {}
  }

  function showToast(message) {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function resetAllFilters() {
    state.activeFilter = {
      gender: 'all', city: 'all', ageRange: 'all', minComp: 80,
      maritalStatus: 'all', education: 'all', searchQuery: '',
      sortBy: 'match-score', onlyFavorites: false
    };
    if (DOM.filterGender) DOM.filterGender.value = 'all';
    if (DOM.filterCity) DOM.filterCity.value = 'all';
    if (DOM.filterMinComp) DOM.filterMinComp.value = '80';
    if (DOM.filterSearch) DOM.filterSearch.value = '';
    renderProfiles();
  }

  // Auth Yürütücüleri (Mükerrer E-Posta Kontrolü & Güvenli Oturum)
  function executeHeroRegister() {
    const isFemale = DOM.heroGenderFemale ? DOM.heroGenderFemale.classList.contains('selected') : false;
    const nameInput = document.getElementById('heroRegName');
    const ageInput = document.getElementById('heroRegAge');
    const cityInput = document.getElementById('heroRegCity');
    const jobInput = document.getElementById('heroRegJob');
    const emailInput = document.getElementById('heroRegEmail');
    const passInput = document.getElementById('heroRegPassword');

    const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim().toLowerCase() : '';
    const password = (passInput && passInput.value.trim()) ? passInput.value.trim() : '123456';
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : (isFemale ? "Zeynep" : "Emre");
    const age = (ageInput && parseInt(ageInput.value)) ? parseInt(ageInput.value) : 28;
    const city = (cityInput && cityInput.value) ? cityInput.value : "İstanbul";
    const job = (jobInput && jobInput.value.trim()) ? jobInput.value.trim() : "Mimar";

    if (!email) {
      showToast("⚠️ Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    // 1. Mükerrer E-Posta Kontrolü (Aynı e-posta ile ikinci kez üye olunamaz)
    let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    const existingUser = regUsers.find(u => u.email && u.email.toLowerCase() === email);

    if (existingUser) {
      showToast(`⚠️ "${email}" adresi ile kayıtlı bir hesap zaten var. Lütfen giriş yapınız.`);
      const loginEmailInput = document.getElementById('loginEmail');
      if (loginEmailInput) loginEmailInput.value = email;
      openModal(DOM.loginModal);
      return;
    }

    // 2. Yeni Kullanıcıyı Oluştur ve Kaydet
    const newUser = {
      id: "reg-" + Date.now(),
      email: email,
      password: password,
      name: name,
      gender: isFemale ? 'female' : 'male',
      age: age,
      city: city,
      profession: job,
      bio: "Saygı ve güvene dayalı ciddi bir ilişki arıyorum.",
      education: "Lisans",
      matchScore: 97,
      verified: true,
      status: 'active',
      isVIP: isFemale,
      vipPlan: null,
      avatar: isFemale 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
      joinDate: new Date().toLocaleDateString('tr-TR')
    };

    regUsers.unshift(newUser);
    localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));

    state.currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      gender: newUser.gender,
      age: newUser.age,
      city: newUser.city,
      profession: newUser.profession,
      bio: newUser.bio,
      isVIP: newUser.isVIP,
      vipPlan: null
    };

    state.isLoggedIn = true;
    localStorage.setItem('harmoni_auth_session', 'true');
    localStorage.setItem('harmoni_current_user', JSON.stringify(state.currentUser));

    trackRealVisit(`🔔 YENİ ÜYE KAYDI: ${name} (${isFemale ? 'Kadın' : 'Erkek'} - ${city} - ${email})`);
    applyAuthStateUI();
    renderProfiles();
    playChime();
    showToast(`🎉 Aramıza Hoşgeldiniz, ${name}! Hesabınız anında aktif edildi.`);
    document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
  }

  function executeModalRegister() {
    const regFemCard = document.getElementById('modalRegGenderFemale');
    const isFemale = regFemCard ? regFemCard.classList.contains('selected') : false;
    const nameInput = document.getElementById('modalRegName');
    const ageInput = document.getElementById('modalRegAge');
    const cityInput = document.getElementById('modalRegCity');
    const jobInput = document.getElementById('modalRegJob');
    const emailInput = document.getElementById('modalRegEmail');
    const passInput = document.getElementById('modalRegPassword');

    const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim().toLowerCase() : '';
    const password = (passInput && passInput.value.trim()) ? passInput.value.trim() : '123456';
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : (isFemale ? "Selin" : "Murat");
    const age = (ageInput && parseInt(ageInput.value)) ? parseInt(ageInput.value) : 29;
    const city = (cityInput && cityInput.value) ? cityInput.value : "İstanbul";
    const job = (jobInput && jobInput.value.trim()) ? jobInput.value.trim() : "Mühendis";

    if (!email) {
      showToast("⚠️ Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    // 1. Mükerrer E-Posta Kontrolü
    let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    const existingUser = regUsers.find(u => u.email && u.email.toLowerCase() === email);

    if (existingUser) {
      showToast(`⚠️ "${email}" adresi ile kayıtlı bir hesap zaten var. Lütfen giriş yapınız.`);
      closeModal(DOM.registerModal);
      window.closeModalById('registerModal');
      const loginEmailInput = document.getElementById('loginEmail');
      if (loginEmailInput) loginEmailInput.value = email;
      openModal(DOM.loginModal);
      return;
    }

    // 2. Yeni Kullanıcıyı Oluştur ve Kaydet
    const newUser = {
      id: "reg-" + Date.now(),
      email: email,
      password: password,
      name: name,
      gender: isFemale ? 'female' : 'male',
      age: age,
      city: city,
      profession: job,
      bio: "Saygı ve güvene dayalı ciddi bir ilişki arıyorum.",
      education: "Lisans",
      matchScore: 97,
      verified: true,
      status: 'active',
      isVIP: isFemale,
      vipPlan: null,
      avatar: isFemale 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
      joinDate: new Date().toLocaleDateString('tr-TR')
    };

    regUsers.unshift(newUser);
    localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));

    state.currentUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      gender: newUser.gender,
      age: newUser.age,
      city: newUser.city,
      profession: newUser.profession,
      bio: newUser.bio,
      isVIP: newUser.isVIP,
      vipPlan: null
    };

    state.isLoggedIn = true;
    localStorage.setItem('harmoni_auth_session', 'true');
    localStorage.setItem('harmoni_current_user', JSON.stringify(state.currentUser));

    trackRealVisit(`🔔 YENİ ÜYE KAYDI: ${name} (${isFemale ? 'Kadın' : 'Erkek'} - ${city} - ${email})`);
    closeModal(DOM.registerModal);
    window.closeModalById('registerModal');
    applyAuthStateUI();
    renderProfiles();
    playChime();
    showToast(`🎉 Aramıza Hoşgeldiniz, ${name}! Hesabınız anında aktif edildi.`);
    document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
  }

  function executeLogin() {
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim().toLowerCase() : 'murat@gmail.com';
    const password = (passInput && passInput.value.trim()) ? passInput.value.trim() : '123456';

    let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    let adminMembers = JSON.parse(localStorage.getItem('harmoni_admin_members') || '[]');
    let allKnown = [...regUsers, ...adminMembers];
    
    let user = allKnown.find(u => u.email && u.email.toLowerCase() === email);

    if (!user) {
      // E-postadan dinamik kullanıcı oluştur ve kaydet
      const emailPrefix = (email.split('@')[0] || 'Murat');
      const cleanName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      user = {
        id: "reg-" + Date.now(),
        email: email,
        password: password,
        name: cleanName,
        gender: 'male',
        age: 31,
        city: 'İstanbul',
        profession: 'Üye',
        bio: 'Ciddi bir ilişki ve evlilik arıyorum.',
        education: 'Lisans',
        matchScore: 97,
        verified: true,
        status: 'active',
        isVIP: false,
        vipPlan: null,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        joinDate: new Date().toLocaleDateString('tr-TR')
      };
      regUsers.unshift(user);
      localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));
    }

    state.currentUser = {
      id: user.id || ("user-" + Date.now()),
      email: user.email || email,
      name: user.name || "Murat Demir",
      gender: user.gender || "male",
      age: user.age || 31,
      city: user.city || "İstanbul",
      profession: user.profession || "Üye",
      bio: user.bio || "Ciddi bir ilişki ve evlilik arıyorum.",
      isVIP: user.isVIP || user.gender === 'female',
      vipPlan: user.vipPlan || null,
      avatar: user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
    };

    state.isLoggedIn = true;
    localStorage.setItem('harmoni_auth_session', 'true');
    localStorage.setItem('harmoni_current_user', JSON.stringify(state.currentUser));

    closeModal(DOM.loginModal);
    window.closeModalById('loginModal');
    window.closeAllModals();
    applyAuthStateUI();
    renderProfiles();
    playChime();
    showToast(`✓ Hoş geldiniz, ${state.currentUser.name}! Başarıyla giriş yapıldı.`);
    
    // Üye portalına ve adaylara yumuşak kaydır
    const matchesEl = document.getElementById('matches');
    if (matchesEl) {
      matchesEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.executeHeroRegister = executeHeroRegister;
  window.executeModalRegister = executeModalRegister;
  window.executeLogin = executeLogin;

  function closeAllModals() {
    closeModal(DOM.profileDetailModal);
    closeModal(DOM.chatModal);
    closeModal(DOM.inboxModal);
    closeModal(DOM.winksModal);
    closeModal(DOM.myProfileModal);
    closeModal(DOM.vipModal);
    closeModal(DOM.checkoutModal);
    closeModal(DOM.quizModal);
    closeModal(DOM.loginModal);
    closeModal(DOM.registerModal);
    closeModal(DOM.feedbackModal);
    closeModal(DOM.legalModal);
  }

  // Event Listeners
  function attachEventListeners() {
    // 1. Landing Cinsiyet Seçimi
    DOM.heroGenderFemale?.addEventListener('click', () => {
      DOM.heroGenderFemale.classList.add('selected');
      DOM.heroGenderMale.classList.remove('selected');
    });

    DOM.heroGenderMale?.addEventListener('click', () => {
      DOM.heroGenderMale.classList.add('selected');
      DOM.heroGenderFemale.classList.remove('selected');
    });

    // 2. Landing Ücretsiz Kayıt Formu
    DOM.heroRegisterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      executeHeroRegister();
    });

    // 3. Giriş Yap / Üye Ol Modal ve Form İşlemleri
    DOM.btnOpenLoginModal?.addEventListener('click', () => openModal(DOM.loginModal));
    DOM.btnOpenRegisterModal?.addEventListener('click', () => openModal(DOM.registerModal));

    DOM.linkSwitchToLogin?.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(DOM.registerModal);
      openModal(DOM.loginModal);
    });

    document.getElementById('linkSwitchToLoginFromReg')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(DOM.registerModal);
      openModal(DOM.loginModal);
    });

    DOM.linkSwitchToRegister?.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(DOM.loginModal);
      openModal(DOM.registerModal);
    });

    // Kayıt Modalı Cinsiyet Seçimi
    const regFemCard = document.getElementById('modalRegGenderFemale');
    const regMaleCard = document.getElementById('modalRegGenderMale');
    regFemCard?.addEventListener('click', () => {
      regFemCard.classList.add('selected');
      regMaleCard?.classList.remove('selected');
    });
    regMaleCard?.addEventListener('click', () => {
      regMaleCard.classList.add('selected');
      regFemCard?.classList.remove('selected');
    });

    // Hızlı Üye Ol Formu (Modal İçi)
    DOM.modalRegisterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      executeModalRegister();
    });

    // Giriş Yap Formu
    DOM.loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      executeLogin();
    });

    // 4. Çıkış Yap (Logout)
    DOM.btnLogout?.addEventListener('click', () => {
      state.isLoggedIn = false;
      localStorage.setItem('harmoni_auth_session', 'false');
      applyAuthStateUI();
      renderProfiles();
      showToast("Giriş sayfasından güvenli çıkış yapıldı.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    DOM.btnOpenQuizModal?.addEventListener('click', startQuiz);
    DOM.btnCloseQuizModal?.addEventListener('click', () => closeModal(DOM.quizModal));

    DOM.btnOpenVipModal?.addEventListener('click', () => openModal(DOM.vipModal));
    DOM.navVipPlans?.addEventListener('click', (e) => { e.preventDefault(); openModal(DOM.vipModal); });
    DOM.btnCloseVipModal?.addEventListener('click', () => closeModal(DOM.vipModal));

    // Profilim Modalı
    DOM.btnOpenMyProfile?.addEventListener('click', () => {
      document.getElementById('myProfName').value = state.currentUser.name;
      document.getElementById('myProfAge').value = state.currentUser.age;
      document.getElementById('myProfCity').value = state.currentUser.city;
      document.getElementById('myProfJob').value = state.currentUser.profession;
      document.getElementById('myProfBio').value = state.currentUser.bio;

      if (state.currentUser.gender === 'female') {
        DOM.genderCardFemale.classList.add('selected');
        DOM.genderCardMale.classList.remove('selected');
      } else {
        DOM.genderCardMale.classList.add('selected');
        DOM.genderCardFemale.classList.remove('selected');
      }
      openModal(DOM.myProfileModal);
    });

    DOM.genderCardFemale?.addEventListener('click', () => {
      DOM.genderCardFemale.classList.add('selected');
      DOM.genderCardMale.classList.remove('selected');
    });

    DOM.genderCardMale?.addEventListener('click', () => {
      DOM.genderCardMale.classList.add('selected');
      DOM.genderCardFemale.classList.remove('selected');
    });

    document.getElementById('navHome')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.isLoggedIn) {
        document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        DOM.landingSection?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    document.getElementById('brandLogo')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    DOM.myProfileForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const isFemale = DOM.genderCardFemale ? DOM.genderCardFemale.classList.contains('selected') : false;

      state.currentUser = {
        id: state.currentUser.id || ("user-" + Date.now()),
        email: state.currentUser.email || "",
        name: document.getElementById('myProfName').value.trim() || state.currentUser.name,
        gender: isFemale ? 'female' : 'male',
        age: parseInt(document.getElementById('myProfAge').value) || state.currentUser.age,
        city: document.getElementById('myProfCity').value.trim() || state.currentUser.city,
        profession: document.getElementById('myProfJob').value.trim() || state.currentUser.profession,
        bio: document.getElementById('myProfBio').value.trim() || state.currentUser.bio,
        isVIP: isFemale ? true : state.currentUser.isVIP,
        vipPlan: state.currentUser.vipPlan,
        avatar: state.currentUser.avatar || (isFemale 
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80")
      };

      localStorage.setItem('harmoni_current_user', JSON.stringify(state.currentUser));

      try {
        let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
        let userIndex = regUsers.findIndex(u => (u.id && u.id === state.currentUser.id) || (u.email && u.email === state.currentUser.email));
        if (userIndex > -1) {
          regUsers[userIndex] = { ...regUsers[userIndex], ...state.currentUser };
        }
        localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));
      } catch(err) {}

      closeModal(DOM.myProfileModal);
      window.closeModalById('myProfileModal');
      updateUserMembershipUI();
      renderProfiles();
      playChime();
      showToast(isFemale ? '✓ Kadın üyelik: Tüm özellikleriniz %100 ÜCRETSİZ tanımlandı!' : '✓ Profil bilgileriniz başarıyla güncellendi.');
    });

    // Filtre Olayları
    DOM.filterSearch?.addEventListener('input', (e) => {
      state.activeFilter.searchQuery = e.target.value;
      renderProfiles();
    });

    DOM.filterGender?.addEventListener('change', (e) => {
      state.activeFilter.gender = e.target.value;
      renderProfiles();
    });

    DOM.filterCity?.addEventListener('change', (e) => {
      state.activeFilter.city = e.target.value;
      renderProfiles();
    });

    DOM.filterMinComp?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      state.activeFilter.minComp = val;
      DOM.compValueDisplay.textContent = `%${val}+`;
      renderProfiles();
    });

    DOM.filterMarital?.addEventListener('change', (e) => {
      state.activeFilter.maritalStatus = e.target.value;
      renderProfiles();
    });

    DOM.filterEducation?.addEventListener('change', (e) => {
      state.activeFilter.education = e.target.value;
      renderProfiles();
    });

    // Pembe Panjur Çevrimiçi Durumu Filtresi
    document.getElementById('filterOnlineStatus')?.addEventListener('change', (e) => {
      state.activeFilter.onlineStatus = e.target.value;
      renderProfiles();
    });

    // Pembe Panjur Hızlı Durum Sekmeleri
    const qtabs = document.querySelectorAll('.pp-qtab');
    qtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        qtabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterType = tab.dataset.statusFilter;
        if (filterType === 'online') {
          state.activeFilter.onlineStatus = 'online-only';
          state.activeFilter.onlyFavorites = false;
        } else if (filterType === 'favorites') {
          state.activeFilter.onlineStatus = 'all';
          state.activeFilter.onlyFavorites = true;
        } else {
          state.activeFilter.onlineStatus = 'all';
          state.activeFilter.onlyFavorites = false;
        }
        renderProfiles();
      });
    });

    DOM.sortBySelect?.addEventListener('change', (e) => {
      state.activeFilter.sortBy = e.target.value;
      renderProfiles();
    });

    DOM.btnResetFilters?.addEventListener('click', resetAllFilters);

    DOM.btnOpenFavorites?.addEventListener('click', () => {
      state.activeFilter.onlyFavorites = !state.activeFilter.onlyFavorites;
      renderProfiles();
      document.getElementById('matches')?.scrollIntoView({ behavior: 'smooth' });
    });

    DOM.btnWinkList?.addEventListener('click', () => {
      if (state.winks.length === 0) {
        DOM.winksListContainer.innerHTML = '<p style="color:var(--text-secondary); text-align:center;">Henüz bir üyeye göz kırpmadınız.</p>';
      } else {
        DOM.winksListContainer.innerHTML = state.winks.map(wid => {
          const user = state.profiles.find(p => p.id === wid);
          if (!user) return '';
          return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1A2234; padding:0.85rem 1.15rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="${user.avatar}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:1.5px solid var(--accent-gold);">
                <div>
                  <h5 style="font-family:var(--font-heading); font-size:1rem; font-weight:800; color:#FFFFFF;">${user.name}, ${user.age}</h5>
                  <span style="font-size:0.78rem; color:var(--accent-gold);">😉 Göz kırpıldı • %${user.matchScore} Uyum</span>
                </div>
              </div>
              <button class="btn-chat-trigger" style="padding:0.45rem 0.95rem; font-size:0.82rem;" data-wink-chat="${user.id}">Mesaj At</button>
            </div>
          `;
        }).join('');

        DOM.winksListContainer.querySelectorAll('[data-wink-chat]').forEach(btn => {
          btn.addEventListener('click', () => {
            closeModal(DOM.winksModal);
            handleChatAccess(btn.dataset.winkChat);
          });
        });
      }
      openModal(DOM.winksModal);
    });

    DOM.btnOpenInbox?.addEventListener('click', () => {
      const chatUserIds = Object.keys(state.chatHistories);
      if (chatUserIds.length === 0) {
        DOM.inboxListContainer.innerHTML = '<p style="color:var(--text-secondary); text-align:center;">Henüz bir sohbet başlatmadınız.</p>';
      } else {
        DOM.inboxListContainer.innerHTML = chatUserIds.map(uid => {
          const user = state.profiles.find(p => p.id === uid);
          if (!user) return '';
          return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1A2234; padding:0.85rem 1.15rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="${user.avatar}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:1.5px solid var(--primary-rose);">
                <div>
                  <h5 style="font-family:var(--font-heading); font-size:1rem; font-weight:800; color:#FFFFFF;">${user.name}, ${user.age}</h5>
                  <span style="font-size:0.78rem; color:var(--text-muted);">${user.city}</span>
                </div>
              </div>
              <button class="btn-chat-trigger" style="padding:0.45rem 0.95rem; font-size:0.82rem;" data-inbox-chat="${user.id}">Sohbete Git</button>
            </div>
          `;
        }).join('');

        DOM.inboxListContainer.querySelectorAll('[data-inbox-chat]').forEach(btn => {
          btn.addEventListener('click', () => {
            closeModal(DOM.inboxModal);
            handleChatAccess(btn.dataset.inboxChat);
          });
        });
      }
      openModal(DOM.inboxModal);
    });

    DOM.chatForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage(DOM.chatInputMessage.value);
    });

    // Şikayet & Öneri
    const btnOpenFeedbackModal = document.getElementById('btnOpenFeedbackModal');
    btnOpenFeedbackModal?.addEventListener('click', () => openModal(DOM.feedbackModal));
    DOM.btnCloseFeedbackModal?.addEventListener('click', () => closeModal(DOM.feedbackModal));

    DOM.feedbackForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedName').value;
      const email = document.getElementById('feedEmail').value;
      const type = document.getElementById('feedType').value;
      const message = document.getElementById('feedMessage').value;

      trackRealVisit(`📩 Yeni Bildirim (${type.toUpperCase()} - ${name})`);

      const mailtoUri = `mailto:apache35meister@gmail.com?subject=HARMONI%20${encodeURIComponent(type.toUpperCase())}%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent("Gönderen: " + name + " (" + email + ")\n\nMesaj:\n" + message)}`;
      
      closeModal(DOM.feedbackModal);
      DOM.feedbackForm.reset();
      playChime();
      showToast(`✓ Bildiriminiz alındı! apache35meister@gmail.com adresine başarıyla iletildi.`);

      setTimeout(() => {
        window.location.href = mailtoUri;
      }, 500);
    });

    // Yasal Sözleşmeler
    const legalTabBtns = document.querySelectorAll('.legal-tab-btn');
    const legalContentBodies = document.querySelectorAll('.legal-content-body');

    document.querySelectorAll('.legal-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.dataset.legal;
        let targetId = 'legalTerms';
        if (type === 'kvkk') targetId = 'legalKvkk';
        else if (type === 'sales') targetId = 'legalSales';
        else if (type === 'refund') targetId = 'legalRefund';

        switchLegalTab(targetId);
        openModal(DOM.legalModal);
      });
    });

    legalTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tabContent;
        switchLegalTab(targetId);
      });
    });

    function switchLegalTab(targetId) {
      legalTabBtns.forEach(b => {
        if (b.dataset.tabContent === targetId) {
          b.style.background = 'rgba(244,63,94,0.2)';
          b.style.color = '#FDA4AF';
          b.style.borderColor = 'rgba(244,63,94,0.4)';
        } else {
          b.style.background = '#1A2234';
          b.style.color = '#94A3B8';
          b.style.borderColor = 'rgba(255,255,255,0.08)';
        }
      });

      legalContentBodies.forEach(body => {
        body.style.display = (body.id === targetId) ? 'block' : 'none';
      });
    }

    DOM.btnCloseLegalModal?.addEventListener('click', () => closeModal(DOM.legalModal));
    DOM.btnCloseLoginModal?.addEventListener('click', () => closeModal(DOM.loginModal));
    DOM.btnCloseRegisterModal?.addEventListener('click', () => closeModal(DOM.registerModal));
    DOM.btnCloseDetailModal?.addEventListener('click', () => closeModal(DOM.profileDetailModal));
    DOM.btnCloseChatModal?.addEventListener('click', () => closeModal(DOM.chatModal));
    DOM.btnCloseInboxModal?.addEventListener('click', () => closeModal(DOM.inboxModal));
    DOM.btnCloseWinksModal?.addEventListener('click', () => closeModal(DOM.winksModal));
    DOM.btnCloseMyProfileModal?.addEventListener('click', () => closeModal(DOM.myProfileModal));
    DOM.btnCloseVipModal?.addEventListener('click', () => closeModal(DOM.vipModal));
    DOM.btnCloseCheckoutModal?.addEventListener('click', () => closeModal(DOM.checkoutModal));

    // Admin Paneli ile Canlı İki Yönlü Senkronizasyon (Sekmeler Arası Anlık Güncelleme)
    window.addEventListener('storage', (e) => {
      if (['harmoni_admin_members', 'harmoni_registered_users', 'harmoni_deleted_profile_ids', 'harmoni_current_user'].includes(e.key)) {
        state.profiles = getSynchronizedProfiles();
        const updatedUser = localStorage.getItem('harmoni_current_user');
        if (updatedUser) {
          try { state.currentUser = JSON.parse(updatedUser); } catch(err) {}
        }
        updateUserMembershipUI();
        renderProfiles();
      }
    });

    [DOM.profileDetailModal, DOM.chatModal, DOM.inboxModal, DOM.winksModal, DOM.myProfileModal, DOM.vipModal, DOM.checkoutModal, DOM.quizModal, DOM.loginModal, DOM.registerModal, DOM.feedbackModal, DOM.legalModal].forEach(modal => {
      modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootHarmoniApp);
} else {
  bootHarmoniApp();
}
