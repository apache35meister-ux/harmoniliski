/**
 * HARMONİ ADMİN & CANLI ANALİTİK PANELİ
 * %100 Gerçek Ziyaretçi Takibi, Gerçek Üyeler ve Ana Site ile Tam İki Yönlü Senkronizasyon Motoru
 */

document.addEventListener('DOMContentLoaded', () => {

  function loadAllAdminMembers() {
    const deletedIds = JSON.parse(localStorage.getItem('harmoni_deleted_profile_ids') || '[]');
    let storedAdminMembers = JSON.parse(localStorage.getItem('harmoni_admin_members') || 'null');
    const realRegisteredUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    const seedCandidates = (typeof MATCH_PROFILES !== 'undefined' ? MATCH_PROFILES : []).map(p => ({
      ...p,
      status: p.status || 'approved',
      isVIP: p.gender === 'female' ? true : (p.isVIP || false),
      joinDate: p.joinDate || '2026-02-17'
    }));

    if (!storedAdminMembers || !Array.isArray(storedAdminMembers) || storedAdminMembers.length === 0) {
      storedAdminMembers = [...realRegisteredUsers, ...seedCandidates];
    } else {
      // Yeni kayıt olan kullanıcıları admin listesine dahil et
      const existingIds = storedAdminMembers.map(m => m.id);
      const newRegs = realRegisteredUsers.filter(r => !existingIds.includes(r.id));
      storedAdminMembers = [...newRegs, ...storedAdminMembers];
    }

    // Silinenleri ayıkla ve kaydet
    storedAdminMembers = storedAdminMembers.filter(m => !deletedIds.includes(m.id));
    localStorage.setItem('harmoni_admin_members', JSON.stringify(storedAdminMembers));
    return storedAdminMembers;
  }

  const adminState = {
    members: loadAllAdminMembers(),
    searchTerm: '',
    statusFilter: 'all'
  };

  // DOM Referansları
  const DOM = {
    adminTableBody: document.getElementById('adminTableBody'),
    adminTrafficTableBody: document.getElementById('adminTrafficTableBody'),
    adminSearchInput: document.getElementById('adminSearchInput'),
    adminStatusFilter: document.getElementById('adminStatusFilter'),
    
    // KPI'lar
    kpiTotalVisits: document.getElementById('kpiTotalVisits'),
    kpiTotalMembers: document.getElementById('kpiTotalMembers'),
    kpiPendingCount: document.getElementById('kpiPendingCount'),
    kpiVipRevenue: document.getElementById('kpiVipRevenue'),
    kpiGenderRatio: document.getElementById('kpiGenderRatio'),
    
    sidebarVisitorsCount: document.getElementById('sidebarVisitorsCount'),
    sidebarMembersCount: document.getElementById('sidebarMembersCount'),
    sidebarPendingCount: document.getElementById('sidebarPendingCount'),
    
    // Aksiyon Butonları
    btnResetAllStats: document.getElementById('btnResetAllStats'),
    btnOpenNewMemberModal: document.getElementById('btnOpenNewMemberModal'),
    btnCloseNewMemberModal: document.getElementById('btnCloseNewMemberModal'),
    newMemberModal: document.getElementById('newMemberModal'),
    newMemberForm: document.getElementById('newMemberForm'),
    
    // Bildirim Barı
    adminNewMemberAlert: document.getElementById('adminNewMemberAlert'),
    adminAlertTitle: document.getElementById('adminAlertTitle'),
    adminAlertDesc: document.getElementById('adminAlertDesc'),
    btnAdminApproveNow: document.getElementById('btnAdminApproveNow'),
    btnAdminDismissAlert: document.getElementById('btnAdminDismissAlert'),

    sideLinks: document.querySelectorAll('.side-link')
  };

  init();

  function init() {
    checkNewMemberAlert();
    updateKPIs();
    renderTrafficLog();
    renderTable();
    attachEvents();
  }

  // Yeni Üye Bildirimi Kontrolü
  function checkNewMemberAlert() {
    const pendingList = adminState.members.filter(m => m.status === 'pending');
    if (pendingList.length > 0 && DOM.adminNewMemberAlert) {
      const latest = pendingList[0];
      DOM.adminAlertTitle.textContent = `🔔 1 YENİ ÜYE ONAY BEKLİYOR!`;
      DOM.adminAlertDesc.textContent = `${latest.name} (${latest.gender === 'female' ? 'Kadın' : 'Erkek'} - ${latest.city}) az önce kayıt oldu.`;
      DOM.adminNewMemberAlert.style.display = 'flex';

      DOM.btnAdminApproveNow.onclick = () => {
        latest.status = 'approved';
        latest.verified = true;
        saveSyncState();
        DOM.adminNewMemberAlert.style.display = 'none';
        updateKPIs();
        renderTable();
        alert(`✓ ${latest.name} adlı üyenin hesabı onaylandı ve sitede yayına alındı!`);
      };

      DOM.btnAdminDismissAlert.onclick = () => {
        DOM.adminNewMemberAlert.style.display = 'none';
      };
    } else if (DOM.adminNewMemberAlert) {
      DOM.adminNewMemberAlert.style.display = 'none';
    }
  }

  // %100 Gerçek İstatistikleri Hesaplama ve Yansıtma
  function updateKPIs() {
    const realVisits = parseInt(localStorage.getItem('harmoni_real_total_visits') || '1');
    const realRevenue = parseInt(localStorage.getItem('harmoni_real_vip_revenue') || '0');
    
    const totalMembers = adminState.members.length;
    const femaleMembers = adminState.members.filter(m => m.gender === 'female').length;
    const maleMembers = adminState.members.filter(m => m.gender === 'male').length;
    const pendingMembers = adminState.members.filter(m => m.status === 'pending').length;

    if (DOM.kpiTotalVisits) DOM.kpiTotalVisits.textContent = realVisits.toLocaleString('tr-TR');
    if (DOM.sidebarVisitorsCount) DOM.sidebarVisitorsCount.textContent = realVisits;

    if (DOM.kpiTotalMembers) DOM.kpiTotalMembers.textContent = totalMembers;
    if (DOM.kpiGenderRatio) DOM.kpiGenderRatio.textContent = `👩 ${femaleMembers} Kadın • 👨 ${maleMembers} Erkek`;
    
    if (DOM.kpiPendingCount) DOM.kpiPendingCount.textContent = pendingMembers;
    if (DOM.kpiVipRevenue) DOM.kpiVipRevenue.textContent = `₺${realRevenue.toLocaleString('tr-TR')}`;

    if (DOM.sidebarMembersCount) DOM.sidebarMembersCount.textContent = totalMembers;
    if (DOM.sidebarPendingCount) DOM.sidebarPendingCount.textContent = pendingMembers;
  }

  // Gerçek Canlı Trafik Günlüğünü Ekrana Basma
  function renderTrafficLog() {
    if (!DOM.adminTrafficTableBody) return;

    let logs = JSON.parse(localStorage.getItem('harmoni_real_visitor_logs') || '[]');

    if (logs.length === 0) {
      logs = [{
        id: 1,
        date: "Bugün",
        action: "Canlı Yayın Başlangıcı",
        device: "💻 Masaüstü (Chrome)",
        status: "🟢 Çevrimiçi / Aktif"
      }];
    }

    DOM.adminTrafficTableBody.innerHTML = logs.map(log => `
      <tr>
        <td><strong style="color:var(--text-primary); font-size:0.85rem;">${log.date}</strong></td>
        <td><span style="font-weight:600; color:#38BDF8;">${log.action}</span></td>
        <td><span style="font-size:0.8rem; color:var(--text-muted);">${log.device}</span></td>
        <td><span style="font-size:0.75rem; font-weight:700; color:#10B981; background:rgba(16, 185, 129, 0.1); padding:3px 8px; border-radius:4px;">${log.status}</span></td>
      </tr>
    `).join('');
  }

  // Filtreleme
  function getFilteredMembers() {
    let list = [...adminState.members];

    if (adminState.statusFilter === 'pending') {
      list = list.filter(m => m.status === 'pending');
    } else if (adminState.statusFilter === 'approved') {
      list = list.filter(m => m.status === 'approved');
    } else if (adminState.statusFilter === 'female') {
      list = list.filter(m => m.gender === 'female');
    } else if (adminState.statusFilter === 'male-vip') {
      list = list.filter(m => m.gender === 'male' && m.isVIP);
    } else if (adminState.statusFilter === 'male-free') {
      list = list.filter(m => m.gender === 'male' && !m.isVIP);
    }

    if (adminState.searchTerm.trim()) {
      const q = adminState.searchTerm.toLowerCase().trim();
      list = list.filter(m => 
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.city && m.city.toLowerCase().includes(q)) ||
        (m.profession && m.profession.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q))
      );
    }

    return list;
  }

  // Tablo Satırlarını Basma
  function renderTable() {
    if (!DOM.adminTableBody) return;
    const list = getFilteredMembers();

    if (list.length === 0) {
      DOM.adminTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:2.5rem; color:var(--text-muted);">
            Seçilen filtreye uygun üye kaydı bulunamadı.
          </td>
        </tr>
      `;
      return;
    }

    DOM.adminTableBody.innerHTML = list.map(member => {
      let membershipBadge = '';
      if (member.gender === 'female') {
        membershipBadge = `<span style="font-size:0.75rem; font-weight:700; color:#E11D48; background:#FFF1F2; padding:3px 8px; border-radius:4px; border:1px solid #FECDD3;">👩 Kadın (%100 Ücretsiz)</span>`;
      } else if (member.isVIP) {
        membershipBadge = `<span style="font-size:0.75rem; font-weight:800; color:#B45309; background:#FEF3C7; padding:3px 8px; border-radius:4px; border:1px solid #FDE68A;">👑 Erkek Gold VIP</span>`;
      } else {
        membershipBadge = `<span style="font-size:0.75rem; font-weight:600; color:#64748B; background:#F1F5F9; padding:3px 8px; border-radius:4px;">👨 Erkek Standart</span>`;
      }

      let statusClass = member.status === 'approved' ? 'approved' : (member.status === 'pending' ? 'pending' : 'banned');
      let statusText = member.status === 'approved' ? '✓ Onaylı' : (member.status === 'pending' ? '⏳ Onay Bekliyor' : '🚫 Askıya Alındı');

      return `
        <tr data-member-id="${member.id}">
          <td>
            <div class="member-cell">
              <img src="${member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}" alt="${member.name}" class="member-avatar">
              <div class="member-details">
                <h4>${member.name}, ${member.age}</h4>
                <span>${member.email || ('Kayıt: ' + (member.joinDate || '2026-02-15'))}</span>
              </div>
            </div>
          </td>
          <td>${membershipBadge}</td>
          <td>
            <div style="font-weight:600;">${member.profession}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${member.city}</div>
          </td>
          <td>
            <strong style="color:var(--primary-pink); font-family:var(--font-heading); font-size:1.05rem;">%${member.matchScore || 95}</strong>
          </td>
          <td>
            <span class="status-badge ${statusClass}">${statusText}</span>
          </td>
          <td>
            <div class="action-btn-group">
              ${member.status !== 'approved' ? `
                <button class="btn-action-icon approve" title="Profili Onayla" data-action="approve" data-id="${member.id}">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
              ` : ''}

              ${member.gender === 'male' ? `
                <button class="btn-action-icon" title="${member.isVIP ? 'VIP İptal Et' : 'VIP Üye Yap'}" style="${member.isVIP ? 'color:#F59E0B;' : ''}" data-action="toggle-vip" data-id="${member.id}">
                  👑
                </button>
              ` : ''}

              ${member.status !== 'banned' ? `
                <button class="btn-action-icon" title="Askıya Al" data-action="ban" data-id="${member.id}">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                </button>
              ` : ''}

              <button class="btn-action-icon" title="Sil" data-action="delete" data-id="${member.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    DOM.adminTableBody.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        handleMemberAction(btn.dataset.action, btn.dataset.id);
      });
    });
  }

  // Veritabanını Ana Site ile Tam Senkronize Kaydetme
  function saveSyncState() {
    localStorage.setItem('harmoni_admin_members', JSON.stringify(adminState.members));
    
    // Registered users listesini de güncelle
    let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    adminState.members.forEach(m => {
      const idx = regUsers.findIndex(r => r.id === m.id || (r.email && r.email === m.email));
      if (idx > -1) {
        regUsers[idx] = { ...regUsers[idx], ...m };
      }
    });
    localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));

    // Eğer işlem gören üye aktif oturum açmış kullanıcıysa oturumu da anında güncelle
    try {
      const currentUser = JSON.parse(localStorage.getItem('harmoni_current_user') || 'null');
      if (currentUser) {
        const matchingMember = adminState.members.find(m => m.id === currentUser.id || (m.email && m.email === currentUser.email));
        if (matchingMember) {
          const updatedCurrentUser = {
            ...currentUser,
            isVIP: matchingMember.isVIP,
            name: matchingMember.name,
            city: matchingMember.city,
            profession: matchingMember.profession
          };
          localStorage.setItem('harmoni_current_user', JSON.stringify(updatedCurrentUser));
        }
      }
    } catch(e) {}
  }

  function handleMemberAction(action, memberId) {
    const member = adminState.members.find(m => m.id === memberId);
    if (!member) return;

    if (action === 'approve') {
      member.status = 'approved';
      member.verified = true;
      saveSyncState();
      updateKPIs();
      renderTable();
      alert(`✓ ${member.name} profili ve fotoğrafları başarıyla onaylandı ve ana sitede yayına alındı.`);
    } else if (action === 'toggle-vip') {
      member.isVIP = !member.isVIP;
      saveSyncState();
      updateKPIs();
      renderTable();
      alert(`👑 ${member.name} için VIP statüsü ${member.isVIP ? 'AKTİF EDİLDİ (Sitede anında VIP oldu)' : 'İPTAL EDİLDİ'}.`);
    } else if (action === 'ban') {
      member.status = 'banned';
      member.verified = false;
      saveSyncState();
      updateKPIs();
      renderTable();
      alert(`🚫 ${member.name} profili askıya alındı (Ana sitede hemen gizlendi).`);
    } else if (action === 'delete') {
      if (confirm(`${member.name} adlı üyeyi kalıcı olarak silmek istediğinizden emin misiniz?`)) {
        adminState.members = adminState.members.filter(m => m.id !== memberId);

        // 1. Kara listeye ekle (Ana sitede de hemen yok olur)
        let deletedIds = JSON.parse(localStorage.getItem('harmoni_deleted_profile_ids') || '[]');
        if (!deletedIds.includes(memberId)) {
          deletedIds.push(memberId);
          localStorage.setItem('harmoni_deleted_profile_ids', JSON.stringify(deletedIds));
        }

        // 2. Kayıtlı üyelerden sil
        let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
        regUsers = regUsers.filter(u => u.id !== memberId);
        localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));

        saveSyncState();
        updateKPIs();
        renderTable();
        alert(`✓ ${member.name} adlı üye kalıcı olarak silindi ve siteden kaldırıldı.`);
      }
    }
  }

  function attachEvents() {
    // Canlı Sekmeler Arası İletişim (Ana sitede kayıt olunduğunda panel anında güncellensin)
    window.addEventListener('storage', (e) => {
      if (['harmoni_registered_users', 'harmoni_real_total_visits', 'harmoni_real_vip_revenue', 'harmoni_real_visitor_logs'].includes(e.key)) {
        adminState.members = loadAllAdminMembers();
        checkNewMemberAlert();
        updateKPIs();
        renderTrafficLog();
        renderTable();
      }
    });

    // Verileri Sıfırlama
    DOM.btnResetAllStats?.addEventListener('click', () => {
      if (confirm('Tüm canlı ziyaretçi kayıtlarını ve ciroyu sıfırlamak istediğinizden emin misiniz?')) {
        localStorage.setItem('harmoni_real_total_visits', '0');
        localStorage.setItem('harmoni_real_vip_revenue', '0');
        localStorage.setItem('harmoni_real_visitor_logs', JSON.stringify([]));
        localStorage.removeItem('harmoni_admin_members');
        localStorage.removeItem('harmoni_deleted_profile_ids');
        
        adminState.members = loadAllAdminMembers();
        updateKPIs();
        renderTrafficLog();
        renderTable();
        alert('✓ Tüm analitik ve üye verileri başarıyla sıfırlandı.');
      }
    });

    DOM.adminSearchInput?.addEventListener('input', (e) => {
      adminState.searchTerm = e.target.value;
      renderTable();
    });

    DOM.adminStatusFilter?.addEventListener('change', (e) => {
      adminState.statusFilter = e.target.value;
      renderTable();
    });

    DOM.sideLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        DOM.sideLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const tab = link.dataset.tab;
        if (tab === 'traffic') {
          document.getElementById('trafficSection')?.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'approvals') {
          adminState.statusFilter = 'pending';
          if (DOM.adminStatusFilter) DOM.adminStatusFilter.value = 'pending';
          renderTable();
          document.getElementById('membersSection')?.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'vip-sales') {
          adminState.statusFilter = 'male-vip';
          if (DOM.adminStatusFilter) DOM.adminStatusFilter.value = 'male-vip';
          renderTable();
          document.getElementById('membersSection')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    DOM.btnOpenNewMemberModal?.addEventListener('click', () => DOM.newMemberModal?.classList.add('active'));
    DOM.btnCloseNewMemberModal?.addEventListener('click', () => DOM.newMemberModal?.classList.remove('active'));

    DOM.newMemberForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const gender = document.getElementById('newMemGender').value;
      const isFemale = gender === 'female';
      const name = document.getElementById('newMemName').value.trim();
      const age = parseInt(document.getElementById('newMemAge').value) || 28;
      const city = document.getElementById('newMemCity').value.trim() || 'İstanbul';
      const job = document.getElementById('newMemJob').value.trim() || 'Mimar';
      const customPhoto = document.getElementById('newMemPhoto').value.trim();

      const defaultAvatar = isFemale 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80";

      const newMem = {
        id: "reg-" + Date.now(),
        name: name,
        email: name.toLowerCase().replace(/\s+/g, '') + "@gmail.com",
        age: age,
        gender: gender,
        city: city,
        profession: job,
        education: "Lisans",
        matchScore: 95,
        verified: true,
        status: 'approved',
        isVIP: isFemale ? true : false,
        avatar: customPhoto || defaultAvatar,
        joinDate: new Date().toLocaleDateString('tr-TR'),
        bio: "Saygı ve sevgi dolu ciddi bir ilişki arıyorum."
      };

      adminState.members.unshift(newMem);
      
      // Kayıtlı kullanıcılara da ekle ki ana site doğrudan görsün
      let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
      regUsers.unshift(newMem);
      localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));
      
      saveSyncState();

      DOM.newMemberForm.reset();
      DOM.newMemberModal?.classList.remove('active');
      updateKPIs();
      renderTable();
      alert(`✓ ${newMem.name} sisteme eklendi ve ana sitede anında yayına alındı!`);
    });
  }
});

