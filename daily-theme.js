/**
 * ZENSPA™ - 81 İl VIP Masaj & Terapi Platformu
 * Otomatik Günlük Tema & Canlı Animasyon Motoru
 * Her gün sitenin ana renk paletini ve lüks atmosferini otomatik değiştirir.
 */
(function() {
  const dailyThemes = [
    // 0: Pazar (Sunday) - Royal Platinum & Diamond White Gold
    {
      dayName: "Pazar",
      themeName: "Royal Platinum",
      goldGradient: "linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)",
      goldGlow: "0 0 35px rgba(226, 232, 240, 0.35)",
      goldText: "#F8FAFC",
      borderGold: "rgba(226, 232, 240, 0.4)",
      borderGoldBright: "rgba(255, 255, 255, 0.8)",
      topbarBg: "linear-gradient(90deg, #050508 0%, #1A1E29 50%, #050508 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #151820 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #0D0F14 0%, transparent 40%)"
    },
    // 1: Pazartesi (Monday) - Imperial 24K Gold & Amber (Klasik Lüks)
    {
      dayName: "Pazartesi",
      themeName: "Imperial Gold",
      goldGradient: "linear-gradient(135deg, #FFE895 0%, #E6AF2E 50%, #BD8313 100%)",
      goldGlow: "0 0 35px rgba(230, 175, 46, 0.35)",
      goldText: "#FDE047",
      borderGold: "rgba(230, 175, 46, 0.4)",
      borderGoldBright: "rgba(255, 215, 0, 0.7)",
      topbarBg: "linear-gradient(90deg, #000000 0%, #1C1300 50%, #000000 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #1A1404 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #0D0902 0%, transparent 40%)"
    },
    // 2: Salı (Tuesday) - Ruby Velvet & Rose Gold (Tutku & VIP)
    {
      dayName: "Salı",
      themeName: "Ruby Velvet",
      goldGradient: "linear-gradient(135deg, #FDA4AF 0%, #F43F5E 50%, #BE123C 100%)",
      goldGlow: "0 0 35px rgba(244, 63, 94, 0.35)",
      goldText: "#FECDD3",
      borderGold: "rgba(244, 63, 94, 0.4)",
      borderGoldBright: "rgba(251, 113, 133, 0.75)",
      topbarBg: "linear-gradient(90deg, #0A0204 0%, #280810 50%, #0A0204 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #20060B 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #140407 0%, transparent 40%)"
    },
    // 3: Çarşamba (Wednesday) - Emerald Jade & Neon Mint (Spa & Wellness)
    {
      dayName: "Çarşamba",
      themeName: "Emerald Jade",
      goldGradient: "linear-gradient(135deg, #6EE7B7 0%, #10B981 50%, #047857 100%)",
      goldGlow: "0 0 35px rgba(16, 185, 129, 0.35)",
      goldText: "#A7F3D0",
      borderGold: "rgba(16, 185, 129, 0.4)",
      borderGoldBright: "rgba(52, 211, 153, 0.75)",
      topbarBg: "linear-gradient(90deg, #020B06 0%, #0A2214 50%, #020B06 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #071C11 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #04120B 0%, transparent 40%)"
    },
    // 4: Perşembe (Thursday) - Royal Sapphire & Electric Cyan (Ultra Modern VIP)
    {
      dayName: "Perşembe",
      themeName: "Royal Sapphire",
      goldGradient: "linear-gradient(135deg, #7DD3FC 0%, #0284C7 50%, #0369A1 100%)",
      goldGlow: "0 0 35px rgba(2, 132, 199, 0.35)",
      goldText: "#BAE6FD",
      borderGold: "rgba(2, 132, 199, 0.4)",
      borderGoldBright: "rgba(56, 189, 248, 0.75)",
      topbarBg: "linear-gradient(90deg, #02070D 0%, #0A1C2E 50%, #02070D 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #071524 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #040D17 0%, transparent 40%)"
    },
    // 5: Cuma (Friday) - Mystic Amethyst & Purple VIP (Hafta Sonu Özel)
    {
      dayName: "Cuma",
      themeName: "Mystic Amethyst",
      goldGradient: "linear-gradient(135deg, #D8B4FE 0%, #A855F7 50%, #7E22CE 100%)",
      goldGlow: "0 0 35px rgba(168, 85, 247, 0.35)",
      goldText: "#E9D5FF",
      borderGold: "rgba(168, 85, 247, 0.4)",
      borderGoldBright: "rgba(192, 132, 252, 0.75)",
      topbarBg: "linear-gradient(90deg, #09020F 0%, #220833 50%, #09020F 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #1A0629 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #10041A 0%, transparent 40%)"
    },
    // 6: Cumartesi (Saturday) - Sunset Bronze & Flame Gold (Cumartesi VIP Enerjisi)
    {
      dayName: "Cumartesi",
      themeName: "Sunset Bronze",
      goldGradient: "linear-gradient(135deg, #FDBA74 0%, #F97316 50%, #C2410C 100%)",
      goldGlow: "0 0 35px rgba(249, 115, 22, 0.35)",
      goldText: "#FED7AA",
      borderGold: "rgba(249, 115, 22, 0.4)",
      borderGoldBright: "rgba(251, 146, 60, 0.75)",
      topbarBg: "linear-gradient(90deg, #0C0501 0%, #2A1305 50%, #0C0501 100%)",
      bgGradient: "radial-gradient(circle at 50% 0%, #210E04 0%, transparent 45%), radial-gradient(circle at 100% 30%, #0A0A0E 0%, transparent 35%), radial-gradient(circle at 0% 70%, #140802 0%, transparent 40%)"
    }
  ];

  function applyDailyTheme() {
    try {
      const dayIndex = new Date().getDay();
      const theme = dailyThemes[dayIndex] || dailyThemes[1];
      const root = document.documentElement;

      root.style.setProperty('--gold-gradient', theme.goldGradient);
      root.style.setProperty('--gold-glow', theme.goldGlow);
      root.style.setProperty('--gold-text', theme.goldText);
      root.style.setProperty('--border-gold', theme.borderGold);
      root.style.setProperty('--border-gold-bright', theme.borderGoldBright);

      const topbar = document.querySelector('.vip-topbar');
      if (topbar && theme.topbarBg) {
        topbar.style.background = theme.topbarBg;
      }

      if (document.body && theme.bgGradient) {
        document.body.style.backgroundImage = theme.bgGradient;
      }
    } catch(e) {
      console.warn("Theme application notice:", e);
    }
  }

  // Anında uygula
  applyDailyTheme();

  // DOM tamamen hazır olduğunda tekrar doğrula
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDailyTheme);
  }
})();
