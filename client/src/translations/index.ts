export type Language =
  | "en"
  | "ar"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "ja"
  | "ko"
  | "tr"
  | "zh"
  | "pt"
  | "ru";

export interface Translations {
  brandName: string;
  brandTagline: string;
  operatingSince: string;
  happyTravelers: string;
  tripAdvisorAward: string;
  freeCancellation: string;
  certifiedGuides: string;
  whatsappSupport: string;
  currencyLabel: string;
  navDestinations: string;
  navCategories: string;
  navBestsellers: string;
  navReviews: string;
  navWhyUs: string;
  navSearchPlaceholder: string;
  heroOverline: string;
  heroH1: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  searchDestination: string;
  searchExperienceType: string;
  searchButton: string;
  allDestinations: string;
  allCategories: string;
  allExperiences: string;
  whereToStart: string;
  browseByCategory: string;
  whereToFirst: string;
  byDestination: string;
  whereWeGo: string;
  whereWeGoSubtitle: string;
  featuredDestinations: string;
  featuredDestinationsTitle: string;
  featuredDestinationsDesc: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;
  theStandard: string;
  signatureTitle: string;
  signatureDesc: string;
  curatedRoutes: string;
  curatedRoutesDesc: string;
  clearLogistics: string;
  clearLogisticsDesc: string;
  guestFirstTiming: string;
  guestFirstTimingDesc: string;
  multidayTitle: string;
  multidaySubtitle: string;
  whyBookWithUs: string;
  authorityTitle: string;
  authorityDesc: string;
  operatingSinceStat: string;
  operatingSinceStatSub: string;
  bookingsMonth: string;
  bookingsMonthSub: string;
  ratingStat: string;
  ratingStatSub: string;
  curatedTours: string;
  fromPrice: string;
  explore: string;
  viewAll: string;
  viewExperience: string;
  freeCancelBadge: string;
  hours: string;
  cartTitle: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  checkoutBtn: string;
  total: string;
  adults: string;
  children: string;
  travelers: string;
  selectDate: string;
  pickupTime: string;
  reserveNowPayLater: string;
  instantConfirmation: string;
  aboutExperience: string;
  experienceHighlights: string;
  tripHourByHour: string;
  inclusions: string;
  exclusions: string;
  frequentlyAskedQuestions: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  qatarSpotlightBadge: string;
  qatarSpotlightTitle: string;
  qatarSpotlightDesc: string;
  qatarSpotlightFeature1: string;
  qatarSpotlightFeature1Desc: string;
  qatarSpotlightFeature2: string;
  qatarSpotlightFeature2Desc: string;
  bookQatarTour: string;
  footerTagline: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
}

const enTranslations: Translations = {
    brandName: "GottQatar",
    brandTagline: "Curated Experiences across Qatar & Arabian Gulf",
    operatingSince: "Operating since 2010 • 50,000+ Happy Guests",
    happyTravelers: "50,000+ Happy Travelers",
    tripAdvisorAward: "TripAdvisor Travelers’ Choice Best of the Best 2024",
    freeCancellation: "Free cancellation on all bookings",
    certifiedGuides: "Licensed Expert Guides",
    whatsappSupport: "WhatsApp Support",
    currencyLabel: "Currency",
    navDestinations: "Destinations",
    navCategories: "Categories",
    navBestsellers: "Bestsellers",
    navReviews: "Reviews",
    navWhyUs: "Why GottQatar",
    navSearchPlaceholder: "Search experiences...",
    heroOverline: "Qatar & Gulf based · Since 2010",
    heroH1: "Experiences worth planning the day around.",
    heroHeadlinePrefix: "Curated Experiences in",
    heroHeadlineHighlight: "Qatar & Arabia",
    heroSubtitle: "Operating since 2010. Curated desert safaris, city tours and coastal journeys across Qatar, the UAE, Egypt and the Gulf.",
    searchDestination: "Destination",
    searchExperienceType: "Experience Type",
    searchButton: "Search",
    allDestinations: "All Destinations",
    allCategories: "All Categories",
    allExperiences: "All Experiences",
    whereToStart: "Where to start",
    browseByCategory: "Browse by category",
    whereToFirst: "Where to, first?",
    byDestination: "By destination",
    whereWeGo: "Where we go",
    whereWeGoSubtitle: "Five destinations. Hundreds of ways to experience them.",
    featuredDestinations: "Featured Destinations",
    featuredDestinationsTitle: "Where will your journey take you?",
    featuredDestinationsDesc: "From the golden Inland Sea dunes of Qatar to futuristic Dubai and ancient pyramids of Giza.",
    bestsellersTitle: "Bestselling Experiences",
    bestsellersSubtitle: "Where to, first?",
    theStandard: "The GottQatar standard",
    signatureTitle: "Small details, planned by people who actually run the trip.",
    signatureDesc: "We keep the catalogue tight, the guide teams close, and the handoff clear from booking to pickup. The result feels less like buying a ticket and more like being expected.",
    curatedRoutes: "Curated routes",
    curatedRoutesDesc: "No anonymous inventory. Every experience has a dedicated local owner.",
    clearLogistics: "Clear logistics",
    clearLogisticsDesc: "Pickup windows, tickets, and guide notes are confirmed upfront.",
    guestFirstTiming: "Guest-first timing",
    guestFirstTimingDesc: "Sunset, crowds, weather, and pacing shape the schedule.",
    multidayTitle: "Multi-day journeys",
    multidaySubtitle: "Immersive trips across Qatar, UAE, Egypt and Oman — guided end to end.",
    whyBookWithUs: "Why book with us",
    authorityTitle: "A Qatar & Gulf team that’s been running these tours since 2010.",
    authorityDesc: "We design the experiences, train the guides, and answer the phone.",
    operatingSinceStat: "Operating since",
    operatingSinceStatSub: "Local team; you talk directly to the people running the tour.",
    bookingsMonth: "20k+",
    bookingsMonthSub: "Bookings every month across Qatar, UAE, Egypt and the Gulf.",
    ratingStat: "★ 4.9",
    ratingStatSub: "Across 60K+ verified reviews on top travel platforms.",
    curatedTours: "curated tours",
    fromPrice: "From",
    explore: "Explore",
    viewAll: "View all →",
    viewExperience: "View experience →",
    freeCancelBadge: "Free cancel",
    hours: "hours",
    cartTitle: "Your Bookings",
    cartEmptyTitle: "Your cart is empty",
    cartEmptyDesc: "Explore our curated desert safaris and city tours to start booking.",
    checkoutBtn: "Proceed to Checkout",
    total: "Total",
    adults: "Adults (Age 12+)",
    children: "Children (Age 3-11)",
    travelers: "Travelers",
    selectDate: "Select Date",
    pickupTime: "Pickup Departure",
    reserveNowPayLater: "Reserve Now & Pay Later",
    instantConfirmation: "Instant confirmation • No booking fee",
    aboutExperience: "About this experience",
    experienceHighlights: "Experience Highlights",
    tripHourByHour: "Your trip, hour by hour",
    inclusions: "Inclusions",
    exclusions: "Exclusions",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    reviewsTitle: "Loved by over 50,000+ adventurers",
    reviewsSubtitle: "Authentic feedback from real guests who journeyed with us across Qatar, UAE, and the Middle East.",
    whyChooseUsTitle: "Why discerning travelers choose GottQatar",
    whyChooseUsSubtitle: "Every detail is engineered for luxury, safety, authenticity, and unforgettable memories.",
    qatarSpotlightBadge: "Qatar Flagship Experience",
    qatarSpotlightTitle: "Khor Al Adaid: Qatar’s UNESCO Inland Sea Phenomenon",
    qatarSpotlightDesc: "Witness one of the only places on Earth where towering desert sand dunes plunge directly into the turquoise Arabian Sea. Experience dune bashing in custom 4x4s, Bedouin luxury camping, and sunset falconry.",
    qatarSpotlightFeature1: "UNESCO Recognized",
    qatarSpotlightFeature1Desc: "Unique marine and desert confluence",
    qatarSpotlightFeature2: "Private Luxury Camps",
    qatarSpotlightFeature2Desc: "Arabian BBQ feasts & stargazing majlis",
    bookQatarTour: "Book Qatar Inland Sea Safari",
    footerTagline: "Operating since 2010. Handcrafted luxury desert safaris, private cultural expeditions, and signature travel experiences in Qatar and the Middle East.",
    footerRights: "All rights reserved. GottQatar. Built with Next.js & Tailwind CSS.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service"
  };

const arTranslations: Translations = {
    brandName: "جوّ قطر",
    brandTagline: "تجارب سياحية منسقة في قطر والخليج العربي",
    operatingSince: "نعمل منذ عام 2010 • أكثر من 50,000 مسافر سعيد",
    happyTravelers: "أكثر من 50,000 مسافر سعيد",
    tripAdvisorAward: "جائزة اختيار المسافرين الأفضل من تريب أدفايزر 2024",
    freeCancellation: "إلغاء مجاني لجميع الحجوزات",
    certifiedGuides: "مرشدون سياحيون معتمدون",
    whatsappSupport: "دعم عبر واتساب",
    currencyLabel: "العملة",
    navDestinations: "الوجهات",
    navCategories: "فئات الجولات",
    navBestsellers: "الأكثر طلباً",
    navReviews: "آراء الضيوف",
    navWhyUs: "لماذا جوّ قطر",
    navSearchPlaceholder: "ابحث عن تجربة...",
    heroOverline: "فريق متخصص في قطر والخليج · منذ عام 2010",
    heroH1: "تجارب استثنائية تستحق التخطيط ليومك حولها.",
    heroHeadlinePrefix: "تجارب استثنائية منسقة في",
    heroHeadlineHighlight: "قطر والخليج العربي",
    heroSubtitle: "نعمل بشغف منذ عام 2010. رحلات سفاري صحراوية وجولات بحرية وثقافية مختارة بعناية في قطر والإمارات ومصر والخليج العربي.",
    searchDestination: "الوجهة",
    searchExperienceType: "نوع التجربة",
    searchButton: "بحث",
    allDestinations: "جميع الوجهات",
    allCategories: "جميع الفئات",
    allExperiences: "جميع التجارب",
    whereToStart: "من أين تبدأ",
    browseByCategory: "تصفح حسب الفئة",
    whereToFirst: "إلى أين تتجه أولاً؟",
    byDestination: "حسب الوجهة",
    whereWeGo: "وجهاتنا المختارة",
    whereWeGoSubtitle: "خمس وجهات كبرى. مئات الطرق لخوض مغامراتها.",
    featuredDestinations: "وجهات مميزة",
    featuredDestinationsTitle: "إلى أين ستأخذك رحلتك القادمة؟",
    featuredDestinationsDesc: "من كثبان خور العديد الساحرة في قطر إلى أفق دبي وأهرامات الجيزة الخالدة.",
    bestsellersTitle: "التجارب الأكثر طلباً",
    bestsellersSubtitle: "إلى أين تتجه أولاً؟",
    theStandard: "معايير جوّ قطر العالية",
    signatureTitle: "تفاصيل دقيقة، مخطط لها بواسطة فريقنا الميداني الخبير.",
    signatureDesc: "نحافظ على تميز اختياراتنا، وتواجد مرشدينا بالقرب منك، وتفاصيل استلام واضحة من لحظة الحجز وحتى الاستقبال في الفندق. التجربة تبدو كأنك ضيف متوقع ولست مجرد حامل تذكرة.",
    curatedRoutes: "مسارات مدروسة",
    curatedRoutesDesc: "لا توجد رحلات عشوائية. كل تجربة يشرف عليها فريق محلي خبير.",
    clearLogistics: "مواعيد واستقبال واضح",
    clearLogisticsDesc: "مواعيد الوصول وتأكيدات التذاكر وملاحظات المرشد معتمدة مسبقاً.",
    guestFirstTiming: "توقيت مخصص للضيف",
    guestFirstTimingDesc: "أوقات الغروب وتفادي الازدحام وحالة الطقس تصمم جدول رحلتك.",
    multidayTitle: "رحلات متعددة الأيام",
    multidaySubtitle: "رحلات استكشافية شاملة عبر قطر، الإمارات، مصر وعُمان — بإرشاد متكامل من البداية للنهاية.",
    whyBookWithUs: "لماذا تحجز معنا",
    authorityTitle: "فريق متخصص في قطر والخليج يدير هذه الجولات منذ عام 2010.",
    authorityDesc: "نحن نصمم التجارب، وندرّب المرشدين، ونرد على مكالماتك على مدار الساعة.",
    operatingSinceStat: "سنة التأسيس",
    operatingSinceStatSub: "فريق محلي؛ تتواصل مباشرة مع من يدير رحلتك الميدانية.",
    bookingsMonth: "20 ألف+",
    bookingsMonthSub: "حجز شهرياً في قطر والإمارات ومصر والخليج.",
    ratingStat: "★ 4.9",
    ratingStatSub: "عبر أكثر من 60 ألف تقييم موثق على كبرى المنصات السياحية.",
    curatedTours: "جولة منسقة",
    fromPrice: "يبدأ من",
    explore: "استكشف",
    viewAll: "عرض الكل ←",
    viewExperience: "عرض التجربة ←",
    freeCancelBadge: "إلغاء مجاني",
    hours: "ساعات",
    cartTitle: "حجوزاتك المختارة",
    cartEmptyTitle: "سلة الحجوزات فارغة",
    cartEmptyDesc: "استكشف رحلات السفاري الصحراوية والجولات السياحية لإضافتها إلى حجزك.",
    checkoutBtn: "المتابعة لإتمام الحجز",
    total: "المجموع الكلي",
    adults: "البالغين (+12 سنة)",
    children: "الأطفال (3-11 سنة)",
    travelers: "المسافرون",
    selectDate: "حدد تاريخ الرحلة",
    pickupTime: "موعد التوصيل",
    reserveNowPayLater: "احجز الآن وادفع لاحقاً",
    instantConfirmation: "تأكيد فوري • بدون رسوم حجز إضافية",
    aboutExperience: "نبذة عن هذه التجربة",
    experienceHighlights: "أبرز محطات التجربة",
    tripHourByHour: "برنامج الرحلة ساعة بساعة",
    inclusions: "الرحلة تشمل",
    exclusions: "الرحلة لا تشمل",
    frequentlyAskedQuestions: "الأسئلة الشائعة والمعلومات الهامة",
    reviewsTitle: "نالت ثقة أكثر من 50,000 مغامر",
    reviewsSubtitle: "آراء وتقييمات موثقة من ضيوفنا الكرام الذين شاركونا أروع الذكريات في قطر والخليج العربي.",
    whyChooseUsTitle: "لماذا يختار المسافرون جوّ قطر؟",
    whyChooseUsSubtitle: "نهتم بأدق التفاصيل لنمنحكم الفخامة والأمان والأصالة في كل رحلة.",
    qatarSpotlightBadge: "التجربة القطرية الرائدة",
    qatarSpotlightTitle: "خور العديد: معجزة البحر الداخلي في قطر المصنفة عالمياً",
    qatarSpotlightDesc: "شاهد أحد أندر الأماكن على وجه الأرض حيث تلتقي رمال الصحراء الذهبية الشاهقة بمياه الخليج العربي الفيروزية مباشرة. استمتع بركوب الكثبان بسيارات الدفع الرباعي والمخيمات البدوية الفاخرة وعروض الصقارة وقت الغروب.",
    qatarSpotlightFeature1: "معترف بها من اليونسكو",
    qatarSpotlightFeature1Desc: "تلاقي فريد بين مياه البحر وكثبان الصحراء",
    qatarSpotlightFeature2: "مخيمات ضيافة فاخرة",
    qatarSpotlightFeature2Desc: "ولائم شواء عربية ومجالس لمراقبة النجوم",
    bookQatarTour: "احجز سفاري خور العديد في قطر",
    footerTagline: "نعمل منذ عام 2010. رحلات سفاري فاخرة، وجولات ثقافية خاصة، وتجارب سياحية رفيعة المستوى في دولة قطر والشرق الأوسط.",
    footerRights: "جميع الحقوق محفوظة لـ جوّ قطر. تم التطوير باستخدام Next.js و Tailwind CSS.",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "الشروط والأحكام"
};

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  ar: arTranslations,
  fr: enTranslations,
  de: enTranslations,
  es: enTranslations,
  it: enTranslations,
  ja: enTranslations,
  ko: enTranslations,
  tr: enTranslations,
  zh: enTranslations,
  pt: enTranslations,
  ru: enTranslations,
};
