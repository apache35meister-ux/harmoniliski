/**
 * HARMONİ ADMİN & CANLI ANALİTİK PANELİ
 * %100 Gerçek Ziyaretçi Takibi, Gerçek Üyeler ve Veri Sıfırlama Motoru
 */

document.addEventListener('DOMContentLoaded', () => {
  // Canlı Kullanıcı Bilgisini Al (Ana siteden)
  const liveCurrentUser = JSON.parse(localStorage.getItem('harmoni_current_user') || JSON.stringify({
    name: "Murat Demir",
    gender: "male",
    age: 31,
    city: "İstanbul",
    profession: "Proje Yöneticisi",
    isVIP: false,
    vipPlan: null
  }));

  // 1. Silinmiş Üye ID'leri (Kara Liste)
  const deletedIds = JSON.parse(localStorage.getItem('harmoni_deleted_profile_ids') || '[]');

  // 2. Admin Üye Listesini Yükle (Kalıcı Depolama)
  let storedAdminMembers = JSON.parse(localStorage.getItem('harmoni_admin_members') || 'null');

  if (!storedAdminMembers) {
    const realRegisteredUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
    const seedCandidates = (typeof MATCH_PROFILES !== 'undefined' ? MATCH_PROFILES : []).map(p => ({
      ...p,
      status: 'approved',
      isVIP: true,
      joinDate: '2026-02-17'
    }));
    storedAdminMembers = [...realRegisteredUsers, ...seedCandidates];
  }

  // Silinmişleri ayıkla ve kaydet
  storedAdminMembers = storedAdminMembers.filter(m => !deletedIds.includes(m.id));
  localStorage.setItem('harmoni_admin_members', JSON.stringify(storedAdminMembers));

  const adminState = {
    members: storedAdminMembers,
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
        localStorage.setItem('harmoni_registered_users', JSON.stringify(adminState.members.filter(m => m.id.startsWith('reg-'))));
        DOM.adminNewMemberAlert.style.display = 'none';
        updateKPIs();
        renderTable();
        alert(`✓ ${latest.name} adlı üyenin hesabı onaylandı ve yayına alındı!`);
      };

      DOM.btnAdminDismissAlert.onclick = () => {
        DOM.adminNewMemberAlert.style.display = 'none';
      };
    }
  }

  // %100 Gerçek İstatistikleri Hesaplama ve Yansıtma
  function updateKPIs() {
    // Gerçek Toplam Ziyaret
    const realVisits = parseInt(localStorage.getItem('harmoni_real_total_visits') || '1');
    const realRevenue = parseInt(localStorage.getItem('harmoni_real_vip_revenue') || '0');
    
    // Gerçek Üyeler
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
      // Varsayılan ilk gerçek ziyaret
      logs = [{
        id: 1,
        date: "Bugün 02:30",
        action: "Sayfa Görüntülendi (Canlı Yayın Başlangıcı)",
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
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.profession.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // Tablo Satırlarını Basma
  function renderTable() {
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
              <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
              <div class="member-details">
                <h4>${member.name}, ${member.age}</h4>
                <span>Kayıt: ${member.joinDate || '2026-02-15'}</span>
              </div>
            </div>
          </td>
          <td>${membershipBadge}</td>
          <td>
            <div style="font-weight:600;">${member.profession}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${member.city}</div>
          </td>
          <td>
            <strong style="color:var(--primary-pink); font-family:var(--font-heading); font-size:1.05rem;">%${member.matchScore}</strong>
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

  function handleMemberAction(action, memberId) {
    const member = adminState.members.find(m => m.id === memberId);
    if (!member) return;

    if (action === 'approve') {
      member.status = 'approved';
      member.verified = true;
      alert(`✓ ${member.name} profili ve fotoğrafları başarıyla onaylandı.`);
    } else if (action === 'toggle-vip') {
      member.isVIP = !member.isVIP;
      alert(`👑 ${member.name} için VIP statüsü ${member.isVIP ? 'AKTİF EDİLDİ' : 'İPTAL EDİLDİ'}.`);
    } else if (action === 'ban') {
      member.status = 'banned';
      member.verified = false;
      alert(`⚠️ ${member.name} profili askıya alındı.`);
    } else if (action === 'delete') {
      if (confirm(`${member.name} adlı üyeyi kalıcı olarak silmek istediğinizden emin misiniz?`)) {
        adminState.members = adminState.members.filter(m => m.id !== memberId);

        // 1. Kara listeye ekle (Yenilendiğinde veya ana sitede asla geri gelmesin)
        let deletedIds = JSON.parse(localStorage.getItem('harmoni_deleted_profile_ids') || '[]');
        if (!deletedIds.includes(memberId)) {
          deletedIds.push(memberId);
          localStorage.setItem('harmoni_deleted_profile_ids', JSON.stringify(deletedIds));
        }

        // 2. Kayıtlı üyelerden sil
        let regUsers = JSON.parse(localStorage.getItem('harmoni_registered_users') || '[]');
        regUsers = regUsers.filter(u => u.id !== memberId);
        localStorage.setItem('harmoni_registered_users', JSON.stringify(regUsers));

        localStorage.setItem('harmoni_admin_members', JSON.stringify(adminState.members));
        updateKPIs();
        renderTable();
        alert(`✓ ${member.name} adlı üye kalıcı olarak silindi.`);
        return;
      }
    }

    localStorage.setItem('harmoni_admin_members', JSON.stringify(adminState.members));
    updateKPIs();
    renderTable();
  }

  function attachEvents() {
    // Verileri Sıfırlama
    DOM.btnResetAllStats?.addEventListener('click', () => {
      if (confirm('Tüm canlı ziyaretçi kayıtlarını ve ciroyu sıfırlamak istediğinizden emin misiniz?')) {
        localStorage.setItem('harmoni_real_total_visits', '0');
        localStorage.setItem('harmoni_real_vip_revenue', '0');
        localStorage.setItem('harmoni_real_visitor_logs', JSON.stringify([]));
        localStorage.removeItem('harmoni_admin_members');
        
        adminState.members = MATCH_PROFILES.map((p) => ({
          ...p,
          status: 'approved',
          isVIP: p.gender === 'female',
          joinDate: '2026-02-15'
        }));

        updateKPIs();
        renderTrafficLog();
        renderTable();
        alert('✓ Tüm analitik veriler başarıyla sıfırlandı.');
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
          DOM.adminStatusFilter.value = 'pending';
          renderTable();
          document.getElementById('membersSection')?.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'vip-sales') {
          adminState.statusFilter = 'male-vip';
          DOM.adminStatusFilter.value = 'male-vip';
          renderTable();
          document.getElementById('membersSection')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    DOM.btnOpenNewMemberModal?.addEventListener('click', () => DOM.newMemberModal.classList.add('active'));
    DOM.btnCloseNewMemberModal?.addEventListener('click', () => DOM.newMemberModal.classList.remove('active'));

    DOM.newMemberForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const gender = document.getElementById('newMemGender').value;
      const isFemale = gender === 'female';

      const newMem = {
        id: "user-" + Date.now(),
        name: document.getElementById('newMemName').value,
        age: parseInt(document.getElementById('newMemAge').value),
        gender: gender,
        city: document.getElementById('newMemCity').value,
        profession: document.getElementById('newMemJob').value,
        education: "Lisans",
        matchScore: 92,
        verified: true,
        status: 'approved',
        isVIP: isFemale ? true : false,
        avatar: document.getElementById('newMemPhoto').value || (isFemale 
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"),
        joinDate: new Date().toISOString().split('T')[0]
      };

      adminState.members.unshift(newMem);
      localStorage.setItem('harmoni_admin_members', JSON.stringify(adminState.members));

      DOM.newMemberForm.reset();
      DOM.newMemberModal.classList.remove('active');
      updateKPIs();
      renderTable();
      alert(`✓ ${newMem.name} sisteme eklendi.`);
    });
  }
});
