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
