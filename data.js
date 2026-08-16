// HARMONİ Matchmaking - 10 Doğal, Gerçekçi ve Özgün Türk Kadın Aday Veritabanı
const MATCH_PROFILES = [
  {
    id: "user-301",
    name: "Ayşe",
    age: 28,
    gender: "female",
    city: "İstanbul",
    district: "Kadıköy",
    profession: "Matematik Öğretmeni",
    education: "Lisans (Marmara Üniversitesi)",
    height: 167,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İleride İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Sosyal Ortamlarda",
    zodiac: "Yengeç",
    matchScore: 98,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_ayse_selfie.jpg",
    photos: ["images/turkish_ayse_selfie.jpg"],
    bio: "Kadıköy'de bir lisede öğretmenlik yapıyorum. Boş vakitlerimde Moda sahilinde yürüyüş yapmayı, dostlarımla çay-kahve sohbetlerini ve kitap okumayı çok seviyorum. Hayatta en değer verdiğim şeyler samimiyet, dürüstlük ve huzurlu bir aile ortamıdır.",
    values: ["Dürüstlük", "Aile Bağları", "Samimiyet", "Saygı"],
    hobbies: ["Kitap Kulübü", "Sahil Yürüyüşü", "Doğa Gezileri", "Yemek Yapmak"],
    compatibility: { values: 98, lifestyle: 95, communication: 97 },
    icebreakers: [
      "Hafta sonunu güzelleştiren favori aktiviten nedir?",
      "En çok gitmek istediğin sahil kasabası neresi?"
    ]
  },
  {
    id: "user-302",
    name: "Gamze",
    age: 26,
    gender: "female",
    city: "İzmir",
    district: "Karşıyaka",
    profession: "Beslenme Uzmanı (Diyetisyen)",
    education: "Lisans (Ege Üniversitesi)",
    height: 169,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Boğa",
    matchScore: 96,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_gamze_candid.jpg",
    photos: ["images/turkish_gamze_candid.jpg"],
    bio: "Karşıyaka'da kendi beslenme danışmanlığı ofisimde çalışıyorum. Ege'nin sakinliğini, deniz kenarında vakit geçirmeyi ve sağlıklı tarifler üretmeyi severim. Hayatımı paylaşabileceğim, pozitif enerjili ve güvenilir bir hayat arkadaşı arıyorum.",
    values: ["Güven", "Sağlıklı Yaşam", "Neşe & Pozitiflik", "Sadakat"],
    hobbies: ["Pilates", "Ege Köy Turları", "Fotoğraf", "Müzik Dinlemek"],
    compatibility: { values: 96, lifestyle: 94, communication: 95 },
    icebreakers: [
      "Sakin bir akşam mı, keşif dolu bir gün mü?",
      "En sevdiğin Ege yemeği hangisi?"
    ]
  },
  {
    id: "user-303",
    name: "Merve",
    age: 31,
    gender: "female",
    city: "Ankara",
    district: "Çankaya",
    profession: "Banka Operasyon Uzmanı",
    education: "Lisans (Gazi Üniversitesi)",
    height: 165,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Başak",
    matchScore: 97,
    verified: true,
    isOnline: false,
    lastActive: "20 dk önce görüldü",
    avatar: "images/turkish_merve_photo.jpg",
    photos: ["images/turkish_merve_photo.jpg"],
    bio: "Çankaya'da kurumsal bir bankada uzmanım. Düzenli ve planlı bir yaşamı severim. Hafta sonları Kuğulu Park'ta yürüyüş yapar, tiyatro ve sergileri takip ederim. Saygının ve karşılıklı anlayışın ön planda olduğu ciddi bir evlilik niyetindeyim.",
    values: ["Açık İletişim", "Güvenilirlik", "Kültür & Sanat", "Huzur"],
    hobbies: ["Devlet Tiyatroları", "Klasik Müzik", "Botanik Bahçesi", "Puzzle"],
    compatibility: { values: 97, lifestyle: 96, communication: 98 },
    icebreakers: [
      "En son izlediğin tiyatro oyunu ya da film neydi?",
      "Ankara'da en sevdiğin dinlenme mekanı neresi?"
    ]
  },
  {
    id: "user-304",
    name: "Büşra",
    age: 27,
    gender: "female",
    city: "Bursa",
    district: "Nilüfer",
    profession: "Eczacı",
    education: "Lisans (Anadolu Üniversitesi Eczacılık)",
    height: 166,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Terazi",
    matchScore: 95,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_busra_selfie.jpg",
    photos: ["images/turkish_busra_selfie.jpg"],
    bio: "Nilüfer'de eczanemdeyim. İnsanlara yardımcı olmayı, sakin ve huzurlu bir hayatı seviyorum. Boş vakitlerimde Bursa'nın tarihi mekanlarını gezmeyi ve tatlı denemeleri yapmayı severim. Güler yüzlü, saygılı bir yuva kurmak istiyorum.",
    values: ["Huzur", "Nezaket", "Aile Sevgisi", "İçtenlik"],
    hobbies: ["Pasta & Tatlı Yapımı", "Tarihi Geziler", "Kahve Kültürü", "Bitki Yetiştirme"],
    compatibility: { values: 95, lifestyle: 93, communication: 96 },
    icebreakers: [
      "Kahvenizi nasıl içersiniz?",
      "Günün yorgunluğunu atmak için en sevdiğin yöntem ne?"
    ]
  },
  {
    id: "user-305",
    name: "Hande",
    age: 33,
    gender: "female",
    city: "İstanbul",
    district: "Beşiktaş",
    profession: "İnsan Kaynakları Yöneticisi",
    education: "Yüksek Lisans (İstanbul Üniversitesi)",
    height: 172,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Sosyal Ortamlarda",
    zodiac: "Aslan",
    matchScore: 94,
    verified: true,
    isOnline: false,
    lastActive: "1 saat önce görüldü",
    avatar: "images/turkish_hande_candid.jpg",
    photos: ["images/turkish_hande_candid.jpg"],
    bio: "Beşiktaş'ta çok uluslu bir şirkette İK yöneticisiyim. İletişimi kuvvetli, hayata pozitif bakan biriyim. Boğaz havası almak, seyahat etmek ve yeni kültürler keşfetmek en büyük tutkum. Hayatı el ele paylaşabileceğim olgun bir hayat arkadaşı arıyorum.",
    values: ["Ortak Vizyon", "Olgunluk", "Dürüstlük", "Dengeli Yaşam"],
    hobbies: ["Yurt Dışı Seyahatleri", "Tenis", "Sinema", "Gastronomi"],
    compatibility: { values: 94, lifestyle: 92, communication: 95 },
    icebreakers: [
      "Birlikte keşfetmeyi en çok hayal ettiğin ülke neresi?",
      "İlişkide en çok dikkat ettiğin kişilik özelliği nedir?"
    ]
  },
  {
    id: "user-306",
    name: "Cansu",
    age: 25,
    gender: "female",
    city: "Eskişehir",
    district: "Tepebaşı",
    profession: "Mimar",
    education: "Lisans (Eskişehir Teknik Üniversitesi)",
    height: 168,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İleride İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Sosyal Ortamlarda",
    zodiac: "İkizler",
    matchScore: 96,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_cansu_selfie.jpg",
    photos: ["images/turkish_cansu_selfie.jpg"],
    bio: "Mimarlık ofisinde proje çizimleri yapıyorum. Tarihi binaları, sokak fotoğrafçılığını ve kış aylarında sıcak mekanları çok severim. Enerjisi yüksek, esprili ve kalbi temiz bir eş adayıyla tanışmak istiyorum.",
    values: ["Samimiyet", "Mizah Anlayışı", "Yaratıcılık", "Güven"],
    hobbies: ["Sokak Fotoğrafçılığı", "Eskiz Çizimi", "Bisiklet", "Akustik Konserler"],
    compatibility: { values: 96, lifestyle: 95, communication: 96 },
    icebreakers: [
      "Hafta sonu bisiklet turu mu, sakin bir kafede sohbet mi?",
      "En sevdiğin Türk filmi hangisi?"
    ]
  },
  {
    id: "user-307",
    name: "Pınar",
    age: 29,
    gender: "female",
    city: "Antalya",
    district: "Muratpaşa",
    profession: "Turizm & Misafir İlişkileri",
    education: "Lisans (Akdeniz Üniversitesi)",
    height: 170,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Yay",
    matchScore: 95,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_pinar_photo.jpg",
    photos: ["images/turkish_pinar_photo.jpg"],
    bio: "Antalya'da butik bir otelde misafir ilişkilerini yönetiyorum. Güneşi, Akdeniz'in maviliğini ve doğayı çok seviyorum. Hayata güler yüzle bakan, dürüst ve saygılı bir hayat arkadaşıyla mutlu bir yuva kurmayı amaçlıyorum.",
    values: ["Huzurlu Yuva", "Doğallık", "Sadakat", "Pozitif Enerji"],
    hobbies: ["Yüzme", "Doğa Yürüyüşü", "Bahçe İşleri", "Kitap Okuma"],
    compatibility: { values: 95, lifestyle: 94, communication: 96 },
    icebreakers: [
      "Deniz kenarında gün batımı mı, dağ havası mı?",
      "Seni en çok ne mutlu eder?"
    ]
  },
  {
    id: "user-308",
    name: "Esra",
    age: 34,
    gender: "female",
    city: "Adana",
    district: "Seyhan",
    profession: "Hemşire",
    education: "Lisans (Çukurova Üniversitesi)",
    height: 164,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Boğa",
    matchScore: 97,
    verified: true,
    isOnline: false,
    lastActive: "35 dk önce görüldü",
    avatar: "images/turkish_esra_selfie.jpg",
    photos: ["images/turkish_esra_selfie.jpg"],
    bio: "Devlet hastanesinde görev yapıyorum. İnsanlara şefkatle yaklaşmak benim mesleğimin parçası. Boş günlerimde ailemle vakit geçirir, parklarda yürüyüş yaparım. Karşılıklı saygı ve güvene dayalı ciddi bir evlilik istiyorum.",
    values: ["Şefkat & Merhamet", "Aileye Bağlılık", "Dürüstlük", "Huzur"],
    hobbies: ["Doğa Yürüyüşü", "Çiçek Bakımı", "Yemek Tarifleri", "Müzik"],
    compatibility: { values: 97, lifestyle: 95, communication: 98 },
    icebreakers: [
      "İdeal bir aile ortamı sence nasıl olmalı?",
      "En sevdiğin ev yemeği hangisi?"
    ]
  },
  {
    id: "user-309",
    name: "Ezgi",
    age: 24,
    gender: "female",
    city: "İstanbul",
    district: "Kadıköy (Moda)",
    profession: "Grafik Tasarımcı",
    education: "Lisans (Mimar Sinan Güzel Sanatlar)",
    height: 166,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İleride İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Sosyal Ortamlarda",
    zodiac: "Kova",
    matchScore: 96,
    verified: true,
    isOnline: true,
    lastActive: "Şimdi Çevrimiçi",
    avatar: "images/turkish_ezgi_candid.jpg",
    photos: ["images/turkish_ezgi_candid.jpg"],
    bio: "Moda'da bir ajansta grafik tasarımcıyım. Kitap kafe ortamlarını, kahve eşliğinde tasarım yapmayı ve sanat sergilerini çok severim. Kendi ayakları üzerinde durabilen, kültürlü, samimi ve dürüst bir hayat arkadaşı arıyorum.",
    values: ["Sanat & Estetik", "Açık Fikirlilik", "Dürüstlük", "Ortak Paylaşım"],
    hobbies: ["Kahve Kültürü", "İllüstrasyon", "Tiyatro", "Seramik"],
    compatibility: { values: 96, lifestyle: 93, communication: 95 },
    icebreakers: [
      "Sakin bir sahaf kafesi mi, hareketli bir konser mi?",
      "En son seni derinden etkileyen kitap hangisiydi?"
    ]
  },
  {
    id: "user-310",
    name: "Nilay",
    age: 30,
    gender: "female",
    city: "Samsun",
    district: "Atakum",
    profession: "Klinik Psikolog",
    education: "Yüksek Lisans (Ondokuz Mayıs Üniversitesi)",
    height: 168,
    maritalStatus: "Hiç Evlenmemiş",
    hasChildren: "Yok",
    wantsChildren: "Evet, İstiyor",
    smoking: "Kullanmıyor",
    alcohol: "Kullanmıyor",
    zodiac: "Balık",
    matchScore: 98,
    verified: true,
    isOnline: false,
    lastActive: "2 saat önce görüldü",
    avatar: "images/turkish_nilay_photo.jpg",
    photos: ["images/turkish_nilay_photo.jpg"],
    bio: "Atakum sahilinde kendi psikolojik danışmanlık merkezimde çalışıyorum. İnsan ruhunu anlamak, empatik iletişim ve derin bağlar kurmak benim için çok kıymetli. Karadeniz sahilinde yürümeyi ve sakin bir yaşamı severim. Huzur dolu bir evlilik niyetindeyim.",
    values: ["Empati", "Derin Bağlar", "Güven", "Huzurlu Yuva"],
    hobbies: ["Sahil Yürüyüşü", "Felsefe & Psikoloji Okumaları", "Yazı Yazmak", "Klasik Müzik"],
    compatibility: { values: 98, lifestyle: 96, communication: 99 },
    icebreakers: [
      "Bir insanda seni ilk etkileyen şey nedir?",
      "Birlikte sakin bir sahil yürüyüşü mü, akşam yemeği mi?"
    ]
  }
];

// Pembe Panjur Standartlarında Gold Üyelik Paketleri
const VIP_PACKAGES = [
  {
    id: "pkg-1",
    name: "1 Aylık Gold",
    duration: "1 Ay",
    price: "299 ₺",
    priceMonthly: "299 ₺/ay",
    priceRaw: 299,
    popular: false,
    badge: "Standart",
    desc: "Sınırsız Mesajlaşma"
  },
  {
    id: "pkg-3",
    name: "3 Aylık Gold VIP",
    duration: "3 Ay",
    price: "599 ₺",
    priceMonthly: "199 ₺/ay",
    priceRaw: 599,
    popular: true,
    badge: "En Popüler (%35 Tasarruf)",
    desc: "Sınırsız Mesaj + Vitrin Önceliği"
  },
  {
    id: "pkg-6",
    name: "6 Aylık Platin",
    duration: "6 Ay",
    price: "999 ₺",
    priceMonthly: "166 ₺/ay",
    priceRaw: 999,
    popular: false,
    badge: "En Avantajlı (%50 Tasarruf)",
    desc: "Platin Rozet & Öncelikli Danışmanlık"
  }
];

// Evlenen Çiftler Başarı Hikayeleri
const SUCCESS_STORIES = [
  {
    id: "story-1",
    couple: "Ayşe & Kemal",
    city: "İstanbul",
    marriedDate: "Kasım 2025'te Evlendiler",
    image: "images/turkish_ayse_selfie.jpg",
    quote: "HARMONİ'nin %98 karakter uyumu sayesinde tanıştık. İlk buluşmada sanki yıllardır birbirimizi tanıyormuş gibiydik."
  },
  {
    id: "story-2",
    couple: "Gamze & Selim",
    city: "İzmir",
    marriedDate: "Ocak 2026'da Evlendiler",
    image: "images/turkish_gamze_candid.jpg",
    quote: "Seviyeli ve güvenilir bir ortamda hayat arkadaşımı buldum. İyi ki varsın HARMONİ!"
  }
];

// Pembe Panjur Tarzı Bilimsel Karakter & Değer Uyumu Testi Soruları
const PERSONALITY_QUIZ_QUESTIONS = [
  {
    id: "q1",
    title: "1. Bir ilişkide sizin için en vazgeçilmez temel değer nedir?",
    options: [
      { text: "🤝 Karşılıklı Dürüstlük ve Sonsuz Güven", score: 25 },
      { text: "❤️ Derin Sevgi, Romantizm ve Tutku", score: 25 },
      { text: "🏡 Aile Bağları, Huzurlu ve Saygılı Bir Yuva", score: 25 },
      { text: "🌟 Ortak Hayaller, Eğlence ve Birlikte Gelişim", score: 25 }
    ]
  },
  {
    id: "q2",
    title: "2. İdeal bir hafta sonu gününü eşinizle nasıl geçirmek istersiniz?",
    options: [
      { text: "☕ Evde sıcak kahve, kitap ve sakin bir film keyfi", score: 25 },
      { text: "🌲 Doğada yürüyüş, deniz kenarı veya yeni bir şehir keşfi", score: 25 },
      { text: "🎨 Tiyatro, sergi, konser gibi kültürel etkinliklerle", score: 25 },
      { text: "👨‍👩‍👧‍👦 Aile ve yakın dostlarla kalabalık güzel bir sofra", score: 25 }
    ]
  },
  {
    id: "q3",
    title: "3. Bir anlaşmazlık veya tartışma anında iletişim tarzınız nasıldır?",
    options: [
      { text: "🧘 Sakinleşmeyi bekler, sonra mantıklı ve yapıcı konuşurum", score: 25 },
      { text: "💬 Hemen o an açıkça ve samimiyetle duygularımı paylaşırım", score: 25 },
      { text: "🤝 Karşımdakini dinler, orta yolu ve empatiyi ararım", score: 25 },
      { text: "😊 Esprili bir dille ortamı yumuşatmaya çalışırım", score: 25 }
    ]
  },
  {
    id: "q4",
    title: "4. Evlilik ve gelecek planlarınızda en büyük önceliğiniz nedir?",
    options: [
      { text: "👶 Sevgi dolu bir aile kurmak ve çocuk sahibi olmak", score: 25 },
      { text: "🌍 Birlikte dünyayı gezmek ve yeni deneyimler yaşamak", score: 25 },
      { text: "💼 Kariyer ve finansal açıdan sağlam, huzurlu bir gelecek", score: 25 },
      { text: "🕊️ Şehrin karmaşasından uzak, sakin ve doğal bir yaşam", score: 25 }
    ]
  }
];
