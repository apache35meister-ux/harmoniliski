// HARMONİ Spa & Masaj - Uzman Masör ve Masöz Profilleri
const MATCH_PROFILES = [
  {
    id: "user-301",
    name: "Ayşe",
    age: 28,
    gender: "female",
    city: "İstanbul",
    district: "Şişli",
    profession: "Uzman Masöz",
    education: "Sertifikalı Spa Terapisti",
    height: 167,
    maritalStatus: "Masaj Terapisti",
    hasChildren: "Esnek Saatler",
    wantsChildren: "Hafta Sonu Uygun",
    smoking: "Uygulamıyor",
    alcohol: "Profesyonel Hizmet",
    zodiac: "İsveç Masajı",
    matchScore: 98,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_ayse_selfie.jpg",
    photos: ["images/turkish_ayse_selfie.jpg"],
    bio: "Şişli bölgesinde profesyonel masaj hizmeti veriyorum. İsveç masajı, medikal masaj ve aromaterapi konularında uzmanım. Günün yorgunluğunu atmak ve kas ağrılarınızdan kurtulmak için hemen randevu alabilirsiniz.",
    values: ["İsveç Masajı", "Aromaterapi", "Medikal Masaj"],
    hobbies: ["Spor Masajı", "Refleksoloji", "Derin Doku"],
    compatibility: { values: 98, lifestyle: 95, communication: 97 },
    icebreakers: [
      "Hangi tür masaj terapi ihtiyacınız var?",
      "Randevu almak ister misiniz?"
    ]
  },
  {
    id: "user-302",
    name: "Gamze",
    age: 26,
    gender: "female",
    city: "İzmir",
    district: "Alsancak",
    profession: "Uzakdoğu Masaj Uzmanı",
    education: "Uluslararası Thai Sertifikası",
    height: 169,
    maritalStatus: "Spa Terapisti",
    hasChildren: "Esnek Saatler",
    wantsChildren: "Randevu ile Çalışır",
    smoking: "Uygulamıyor",
    alcohol: "Profesyonel Hizmet",
    zodiac: "Thai Masajı",
    matchScore: 96,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_gamze_candid.jpg",
    photos: ["images/turkish_gamze_candid.jpg"],
    bio: "Alsancak'taki özel stüdyomda geleneksel Thai masajı ve Shiatsu uygulamaları yapıyorum. Uzakdoğu teknikleriyle enerjinizi tazelemek ve vücudunuzu esnetmek için bana ulaşabilirsiniz.",
    values: ["Thai Masajı", "Shiatsu", "Asya Terapisi"],
    hobbies: ["Esnetme", "Yoga Terapisi", "Sıcak Taş"],
    compatibility: { values: 96, lifestyle: 94, communication: 95 },
    icebreakers: [
      "Uzakdoğu masajlarını denediniz mi?",
      "Vücudunuzda özellikle gergin hissettiğiniz bir bölge var mı?"
    ]
  },
  {
    id: "user-303",
    name: "Merve",
    age: 31,
    gender: "female",
    city: "Ankara",
    district: "Çankaya",
    profession: "Klinik Masaj Terapisti",
    education: "Fizyoterapi Ön Lisans",
    height: 165,
    maritalStatus: "Medikal Masör",
    hasChildren: "Gündüz Seansları",
    wantsChildren: "Pazar Hariç",
    smoking: "Uygulamıyor",
    alcohol: "Profesyonel Hizmet",
    zodiac: "Medikal Masaj",
    matchScore: 97,
    verified: true,
    isOnline: false,
    lastActive: "20 dk önce görüldü",
    avatar: "images/turkish_merve_photo.jpg",
    photos: ["images/turkish_merve_photo.jpg"],
    bio: "Ankara Çankaya'da sırt, boyun ve bel ağrılarına yönelik medikal masaj uygulamaları yapıyorum. Spor yaralanmaları ve kronik ağrılar için özel fizyoterapi destekli seanslar düzenliyorum.",
    values: ["Medikal Masaj", "Derin Doku", "Fizik Tedavi Destekli"],
    hobbies: ["Tetik Nokta", "Kupa Terapisi", "Sporcu Masajı"],
    compatibility: { values: 97, lifestyle: 96, communication: 98 },
    icebreakers: [
      "Kronik bir ağrınız bulunuyor mu?",
      "Hangi bölgelerde kas spazmı yaşıyorsunuz?"
    ]
  },
  {
    id: "user-304",
    name: "Burak",
    age: 32,
    gender: "male",
    city: "İstanbul",
    district: "Beşiktaş",
    profession: "Spor Masörü",
    education: "Beden Eğitimi ve Spor Yüksekokulu",
    height: 182,
    maritalStatus: "Spor Masörü",
    hasChildren: "Akşam Seansları",
    wantsChildren: "Hafta İçi Uygun",
    smoking: "Uygulamıyor",
    alcohol: "Profesyonel Hizmet",
    zodiac: "Spor Masajı",
    matchScore: 99,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_burak_photo_1786793640471.jpg",
    photos: ["images/turkish_burak_photo_1786793640471.jpg"],
    bio: "Profesyonel sporcular ve yoğun antrenman yapanlar için özel sporcu masajı ve derin doku (deep tissue) uygulamaları yapıyorum. Kas toparlanmasını hızlandırmak için randevu oluşturabilirsiniz.",
    values: ["Spor Masajı", "Derin Doku", "Fitness Terapisi"],
    hobbies: ["Myofasyal Gevşetme", "Kinezyo Bantlama", "Manuel Terapi"],
    compatibility: { values: 99, lifestyle: 97, communication: 95 },
    icebreakers: [
      "Düzenli spor yapıyor musunuz?",
      "Antrenman sonrası kas ağrılarınız oluyor mu?"
    ]
  },
  {
    id: "user-305",
    name: "Hande",
    age: 33,
    gender: "female",
    city: "İstanbul",
    district: "Kadıköy",
    profession: "Spa & Relax Masözü",
    education: "Holistik Terapiler Uzmanı",
    height: 172,
    maritalStatus: "Spa Masözü",
    hasChildren: "Randevulu",
    wantsChildren: "Hafta Sonu Kapalı",
    smoking: "Uygulamıyor",
    alcohol: "Profesyonel Hizmet",
    zodiac: "Aromaterapi",
    matchScore: 94,
    verified: true,
    isOnline: false,
    lastActive: "1 saat önce görüldü",
    avatar: "images/turkish_hande_candid.jpg",
    photos: ["images/turkish_hande_candid.jpg"],
    bio: "Günlük stresinizden arınmak ve zihninizi boşaltmak için esansiyel yağlarla aromaterapi ve anti-stres masajı sunuyorum. Sakinleştirici müzikler eşliğinde tam bir yenilenme seansı.",
    values: ["Aromaterapi", "Anti-Stres", "Holistik Masaj"],
    hobbies: ["Sıcak Taş Masajı", "Baş ve Boyun", "Refleksoloji"],
    compatibility: { values: 94, lifestyle: 92, communication: 95 },
    icebreakers: [
      "Stres atmaya mı ihtiyacınız var?",
      "Hangi aromatik yağları tercih edersiniz?"
    ]
  }
];

// Masaj Paketleri (Randevu Tipleri)
const VIP_PACKAGES = [
  {
    id: "pkg-1",
    name: "Standart İsveç Masajı",
    duration: "60 Dakika",
    price: "800 ₺",
    priceMonthly: "Seans Başı",
    priceRaw: 800,
    popular: false,
    badge: "Klasik",
    desc: "Tüm vücut rahatlama masajı"
  },
  {
    id: "pkg-3",
    name: "Derin Doku / Sporcu Masajı",
    duration: "90 Dakika",
    price: "1200 ₺",
    priceMonthly: "Seans Başı",
    priceRaw: 1200,
    popular: true,
    badge: "En Popüler",
    desc: "Kas ağrılarına özel baskılı masaj"
  },
  {
    id: "pkg-6",
    name: "VIP Thai & Shiatsu Terapisi",
    duration: "120 Dakika",
    price: "1600 ₺",
    priceMonthly: "Seans Başı",
    priceRaw: 1600,
    popular: false,
    badge: "Premium",
    desc: "Esnetme ve enerji noktası terapisi"
  }
];

// Müşteri Yorumları (Eski Başarı Hikayeleri)
const SUCCESS_STORIES = [
  {
    id: "story-1",
    couple: "Kemal Y. (Müşteri)",
    city: "İstanbul",
    marriedDate: "Değerlendirme: 5 Yıldız",
    image: "images/turkish_ayse_selfie.jpg",
    quote: "Ayşe Hanım'ın İsveç masajı gerçekten günün tüm stresini aldı. Tertemiz bir ortam ve profesyonel hizmet. Kesinlikle tavsiye ederim."
  },
  {
    id: "story-2",
    couple: "Selin K. (Müşteri)",
    city: "İzmir",
    marriedDate: "Değerlendirme: 5 Yıldız",
    image: "images/turkish_gamze_candid.jpg",
    quote: "Gamze Hanım'ın Thai masajı teknikleri muazzamdı. Bel ağrılarım gözle görülür şekilde azaldı. Teşekkürler!"
  }
];

// Masaj İhtiyaç Analizi Testi
const PERSONALITY_QUIZ_QUESTIONS = [
  {
    id: "q1",
    title: "1. Masajdan beklentiniz öncelikle nedir?",
    options: [
      { text: "🧘 Tamamen rahatlamak ve stresten arınmak", score: 25 },
      { text: "💪 Spor sonrası kas ağrılarını ve tutulmaları gidermek", score: 25 },
      { text: "🩺 Bel, boyun gibi spesifik ağrıları tedaviye destek olmak", score: 25 },
      { text: "🌟 Enerjimi yükseltmek ve vücudumu esnetmek", score: 25 }
    ]
  },
  {
    id: "q2",
    title: "2. Masaj sırasında baskı şiddeti nasıl olmalı?",
    options: [
      { text: "🍃 Yumuşak ve ritmik dokunuşlar (Hafif Baskı)", score: 25 },
      { text: "⚖️ Orta seviye, rahatlatıcı ama kasları da hisseden (Orta Baskı)", score: 25 },
      { text: "🧱 Güçlü baskı ile derin dokulara ulaşılması (Sert Baskı)", score: 25 },
      { text: "🤸 Esnetme ve germe odaklı (Thai tarzı baskılar)", score: 25 }
    ]
  }
];
