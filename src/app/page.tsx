"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";

import catalogData from "@/data/catalog_experiences.json";
import { CatalogExperience } from "@/types";

import {
  Search,
  Star,
  Play,
  Check
} from "lucide-react";

// ============================================================================
// STATIC SECTION DEFINITIONS MATCHING HOMEPAGEFINAL.PNG
// ============================================================================

const SEARCH_CHIPS = [
  { label: "Premium Safari Dubai", labelAr: "سفاري دبي الفاخر", term: "Premium Safari" },
  { label: "Premium Abu Dhabi Tour", labelAr: "جولة أبوظبي المتميزة", term: "Abu Dhabi" },
  { label: "Grand Mosque", labelAr: "جامع الشيخ زايد", term: "Mosque" },
  { label: "Old Souqs", labelAr: "الأسواق القديمة", term: "Souk" },
  { label: "Dubai Horse-riding", labelAr: "ركوب الخيل في دبي", term: "Horse" }
];

const CATEGORIES = [
  {
    id: "desert",
    name: "Desert",
    nameAr: "صحراء",
    image: "/images/cat_desert.jpg",
    href: "/categories/desert"
  },
  {
    id: "historical",
    name: "Historical",
    nameAr: "تاريخي",
    image: "/images/cat_historical.jpg",
    href: "/categories/historical"
  },
  {
    id: "adventure",
    name: "Adventure",
    nameAr: "مغامرة",
    image: "/images/cat_adventure.jpg",
    href: "/categories/adventure"
  },
  {
    id: "city-tours",
    name: "City Tours",
    nameAr: "جولات المدينة",
    image: "/images/cat_city-tours.jpg",
    href: "/categories/city-tours"
  },
  {
    id: "multiday",
    name: "Multiday",
    nameAr: "عدة أيام",
    image: "/images/cat_multiday.jpg",
    href: "/multiday"
  },
  {
    id: "cultural",
    name: "Cultural",
    nameAr: "ثقافي",
    image: "/images/cat_cultural.jpg",
    href: "/categories/cultural"
  }
];

const WHERE_TO_DESTINATIONS = [
  { id: "Dubai", label: "Dubai", labelAr: "دبي" },
  { id: "Cairo", label: "Cairo", labelAr: "القاهرة" },
  { id: "Abu Dhabi", label: "Abu Dhabi", labelAr: "أبوظبي" },
  { id: "Dubrovnik", label: "Dubrovnik", labelAr: "دوبروفنيك" },
  { id: "Marrakech", label: "Marrakech", labelAr: "مراكش" },
  { id: "Hurghada", label: "Hurghada", labelAr: "الغردقة" },
  { id: "Doha", label: "Doha", labelAr: "الدوحة" },
  { id: "Sharm El Sheikh", label: "Sharm El Sheikh", labelAr: "شرم الشيخ" },
  { id: "Alexandria", label: "Alexandria", labelAr: "الإسكندرية" }
];

const VIDEO_REELS = [
  {
    id: "reel-1",
    title: "Sheikh Zayed Grand Mosque Walking Tour",
    titleAr: "جولة جامع الشيخ زايد الكبير الإرشادية",
    poster: "/images/exp_abu_dhabi_morning.jpg",
    href: "/experiences/sheikh-zayed-grand-mosque-guided-walking-tour"
  },
  {
    id: "reel-2",
    title: "Dubai Desert Safari & Dune Bashing",
    titleAr: "سفاري دبي وكثبان الرمال الذهبية",
    poster: "/brand/signature-standard-poster.jpg",
    href: "/experiences/dubai-evening-desert-safari-bbq-dinner-falcon"
  },
  {
    id: "reel-3",
    title: "Camel Ride & Arabian Sunset",
    titleAr: "ركوب الجمال وغروب الشمس الساحر",
    poster: "/images/exp_safari_alkhayma.jpg",
    href: "/experiences/dubai-desert-safari-quad-bike-camel-ride-sandboarding"
  },
  {
    id: "reel-4",
    title: "Al Marmoom Desert Dome & Dinner",
    titleAr: "قباب المرموم الفاخرة والعشاء البدوي",
    poster: "/images/exp_alkhayma_bbq.jpg",
    href: "/experiences/al-marmoom-oasis-luxury-experiential-desert-domes"
  },
  {
    id: "reel-5",
    title: "Old Dubai Heritage Walking Tour",
    titleAr: "جولة تراث دبي القديمة في الفهيدي",
    poster: "/images/exp_alfahidi_walking.jpg",
    href: "/experiences/04-hours-short-dubai-city-tour"
  }
];

const WHERE_WE_GO_DESTINATIONS = [
  {
    id: "dubai",
    slug: "dubai",
    name: "Dubai",
    nameAr: "دبي",
    experienceCount: "27 experiences",
    experienceCountAr: "27 تجربة",
    tagline: "The Pearl of the Middle East",
    taglineAr: "لؤلؤة الشرق الأوسط",
    image: "/images/dest_dubai.jpg"
  },
  {
    id: "abu-dhabi",
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    nameAr: "أبوظبي",
    experienceCount: "16 experiences",
    experienceCountAr: "16 تجربة",
    tagline: "The Capital of UAE",
    taglineAr: "عاصمة دولة الإمارات",
    image: "/images/dest_abu_dhabi.jpg"
  },
  {
    id: "doha",
    slug: "doha",
    name: "Doha",
    nameAr: "الدوحة",
    experienceCount: "8 experiences",
    experienceCountAr: "8 تجارب",
    tagline: "Adventures in the desert",
    taglineAr: "مغامرات في قلب الصحراء والبحر",
    image: "/images/dest_doha.jpg"
  },
  {
    id: "cairo",
    slug: "cairo",
    name: "Cairo",
    nameAr: "القاهرة",
    experienceCount: "19 experiences",
    experienceCountAr: "19 تجربة",
    tagline: "The ancient Nile civilization",
    taglineAr: "حضارة النيل الخالدة",
    image: "/images/dest_cairo.jpg"
  },
  {
    id: "sharm",
    slug: "sharm-el-sheikh",
    name: "Sharm El Sheikh",
    nameAr: "شرم الشيخ",
    experienceCount: "12 experiences",
    experienceCountAr: "12 تجربة",
    tagline: "Crystal clear waters and sandy beaches",
    taglineAr: "مياه فيروزية صافية وشواطئ خلابة",
    image: "/images/dest_sharm.jpg"
  }
];

const MOODS = [
  { id: "bucket-list", label: "Bucket-list icons", labelAr: "معالم لا تفوّت" },
  { id: "adrenaline", label: "Adrenaline rush", labelAr: "حماس وإثارة" },
  { id: "romantic", label: "Romantic escapes", labelAr: "أجواء رومانسية" },
  { id: "family", label: "Family outing", labelAr: "رحلات عائلية" },
  { id: "culture", label: "Culture & heritage", labelAr: "ثقافة وتراث" },
  { id: "water", label: "On the water", labelAr: "أنشطة بحرية" },
  { id: "flavours", label: "Local flavours", labelAr: "نكهات ومأكولات" },
  { id: "epic", label: "Epic journeys", labelAr: "رحلات ملحمية" }
];

const MULTIDAY_JOURNEYS = [
  {
    id: "multi-1",
    slug: "cairo-2-day-bahariya-oasis-camp-and-desert-tour",
    title: "Cairo: 2-Day Bahariya Oasis Camp and Desert Tour",
    titleAr: "القاهرة: رحلة يومين لمخيم واحة البحرية والصحراء البيضاء",
    destination: "Cairo",
    destinationAr: "القاهرة",
    nextDate: "NEXT: NOV 18",
    nextDateAr: "الرحلة القادمة: 18 نوفمبر",
    rating: 4.8,
    reviews: 903,
    price: 225.67,
    image: "/images/multiday_1.jpg"
  },
  {
    id: "multi-2",
    slug: "09-days-egypt-tour-cairo-pyramids-luxor-aswan-nile-cruise",
    title: "09-Days Egypt Tour: Cairo Pyramids, Luxor, Aswan & Nile Cruise",
    titleAr: "جولة مصر 9 أيام: أهرامات القاهرة، الأقصر، أسوان والرحلة النيلية",
    destination: "Cairo",
    destinationAr: "القاهرة",
    nextDate: "NEXT: NOV 18",
    nextDateAr: "الرحلة القادمة: 18 نوفمبر",
    rating: 4.8,
    reviews: 992,
    price: 1618.47,
    image: "/images/multiday_2.jpg"
  },
  {
    id: "multi-3",
    slug: "cairo-3-day-siwa-oasis-tour-safari-camp-historical-site",
    title: "Cairo: 3-Day Siwa Oasis Tour, Safari, Camp & Historical Site",
    titleAr: "القاهرة: رحلة 3 أيام لواحة سيوة الأسطورية والسفاري والينابيع الكبريتية",
    destination: "Cairo",
    destinationAr: "القاهرة",
    nextDate: "NEXT: NOV 18",
    nextDateAr: "الرحلة القادمة: 18 نوفمبر",
    rating: 4.8,
    reviews: 1073,
    price: 635.78,
    image: "/images/multiday_3.jpg"
  }
];

export default function HomePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Section 3: "Where to, first?" Filter State
  const [selectedWhereToDest, setSelectedWhereToDest] = useState("Dubai");

  // Section 8: "Pick a mood" Filter State
  const [selectedMood, setSelectedMood] = useState("family");

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/experiences?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/experiences");
    }
  };

  const handleChipClick = (term: string) => {
    router.push(`/experiences?q=${encodeURIComponent(term)}`);
  };

  // Section 3: Tours for "Where to, first?"
  const whereToTours = useMemo(() => {
    const list = catalogData as CatalogExperience[];
    const matched = list.filter((item) =>
      item.destination.toLowerCase().includes(selectedWhereToDest.toLowerCase())
    );
    return matched.slice(0, 4);
  }, [selectedWhereToDest]);

  // Section 8: Tours for "Pick a mood, we'll pick the tour."
  const moodTours = useMemo(() => {
    const list = catalogData as CatalogExperience[];
    // Hand-curated 8 tours matching homepagefinal.png exact order
    const ids = [
      "exp-2", // Dubai: Half-Day Desert Safari, Quad Bike, Camels & Sandboarding (31.55)
      "exp-13", // Abu Dhabi: Desert Safari with Camel Ride, Sandboarding & BBQ (77.55)
      "exp-3", // Dubai City Tour with Frame Ticket, Creek, Souks & Blue Mosque (54.32)
      "exp-44", // Private Dubai City Tour with Burj Khalifa (517.27)
      "exp-31", // Abu Dhabi: Guided Walking Tour at Sheikh Zayed (or Louvre) (15.31 / 22.72)
      "exp-5", // Dubai: Al Marmoom Oasis Horse Riding Experience (27.16)
      "exp-8", // Dubai: Al Khayma Camp Experience with BBQ Dinner (62.66)
      "exp-14" // Dubai: Evening Heritage Safari in Vintage G-Class at Al Marmoom (145.67)
    ];

    const found = ids.map((id) => list.find((item) => item.id === id)).filter(Boolean) as CatalogExperience[];
    if (found.length >= 8) return found;
    return list.slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ==============================================================
            SECTION 1: HERO HEADER WITH SEARCH CAPSULE & TRUST PILLS
            ============================================================== */}
        <section className="relative min-h-[620px] sm:min-h-[680px] md:min-h-[720px] lg:min-h-[780px] flex flex-col justify-center bg-[#0A2234] text-white overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-24 sm:pb-24 md:pb-20">
          {/* Pristine Clean Desert Hero Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              src="/brand/hero/home-hero.jpg"
              alt="Golden Arabian Desert Dunes at Sunset"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Natural Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2234]/95 via-[#0A2234]/40 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2234]/85 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 w-full space-y-4 sm:space-y-5">
            {/* Kicker / Eyebrow */}
            <p className="t-eyebrow text-white/85 tracking-[0.16em] sm:tracking-[0.2em] text-[9.5px] sm:text-xs">
              {language === "ar"
                ? "دبي وقطر · خبرة منذ عام 2010"
                : "DUBAI BASED · SINCE 2010"}
            </p>

            {/* Main H1 Headline */}
            <h1 className="t-hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold sm:font-semibold tracking-tight text-white leading-[1.14] sm:leading-[1.08] max-w-3xl">
              {language === "ar"
                ? "تجارب تستحق أن تخطط يومك حولها."
                : "Experiences worth planning the day around."}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl font-normal leading-relaxed">
              {language === "ar"
                ? "رحلات السفاري الصحراوية، الجولات البحرية، والرحلات متعددة الأيام عبر قطر، الإمارات، مصر، والمزيد."
                : "Desert safaris, sea cruises, and multi-day journeys across the UAE, Egypt, Croatia, Morocco, and Oman."}
            </p>

            {/* WHAT CAN WE PLAN FOR YOU? Search Glass Capsule */}
            <div className="pt-1 sm:pt-2 max-w-2xl w-full">
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white/[0.14] hover:bg-white/[0.18] backdrop-blur-xl border border-white/25 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all"
              >
                <label className="block text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-white/75 mb-2 sm:mb-2.5">
                  {language === "ar" ? "ماذا يمكننا أن نخطط لك؟" : "WHAT CAN WE PLAN FOR YOU?"}
                </label>

                {/* Search Input Bar */}
                <div className="relative flex items-center">
                  <Search className="absolute left-3 rtl:left-auto rtl:right-3 sm:left-3.5 sm:rtl:left-auto sm:rtl:right-3.5 w-4 h-4 text-white/70 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      language === "ar"
                        ? "ابحث عن الجولات، التجارب، والوجهات..."
                        : "Search for tours, experiences, locations"
                    }
                    suppressHydrationWarning
                    className="w-full pl-9 pr-20 rtl:pl-20 rtl:pr-9 sm:pl-10 sm:pr-24 rtl:sm:pl-24 rtl:sm:pr-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/35 hover:bg-black/45 focus:bg-black/55 text-white placeholder-white/60 text-xs sm:text-sm border border-white/20 focus:outline-hidden focus:border-cyan-300 transition-all font-medium"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 rtl:right-auto rtl:left-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg bg-[#0097CA] hover:bg-[#0083B0] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    {language === "ar" ? "بحث" : "Search"}
                  </button>
                </div>

                {/* Quick Search Chips */}
                <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {SEARCH_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleChipClick(chip.term)}
                      className="text-[10.5px] sm:text-[11px] font-semibold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-xs"
                    >
                      {language === "ar" ? chip.labelAr : chip.label}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-md border-t border-white/15 py-2.5 sm:py-3 z-10">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between sm:justify-start gap-3 sm:gap-8 md:gap-10 text-[11px] sm:text-xs font-semibold text-white/90 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">
                  {language === "ar" ? "★ 4.9 أكثر من 244 ألف تقييم" : "★ 4.9 244K reviews"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">{language === "ar" ? "إلغاء مجاني" : "Free cancellation"}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400 shrink-0" />
                <span className="whitespace-nowrap">{language === "ar" ? "تأكيد فوري" : "Instant confirm"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2: BROWSE BY CATEGORY
            ============================================================== */}
        <section className="bg-[#FAFBFC] py-12 lg:py-16 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
            <div>
              <p className="t-eyebrow text-[#0097CA] mb-1.5">
                {language === "ar" ? "من أين تبدأ" : "WHERE TO START"}
              </p>
              <h2 className="t-section-title text-xl sm:text-2xl font-bold text-black">
                {language === "ar" ? "تصفح حسب الفئة" : "Browse by category"}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/experiences?category=${cat.id}`}
                  className="group flex flex-col items-center cursor-pointer"
                >
                  <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs group-hover:shadow-lg transition-all duration-300">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <span className="mt-2.5 text-xs sm:text-[13px] font-bold text-black group-hover:text-[#0097CA] transition-colors text-center">
                    {language === "ar" ? cat.nameAr : cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: WHERE TO, FIRST? (BY DESTINATION FILTER & 4 CARDS)
            ============================================================== */}
        <section className="bg-white py-12 lg:py-16 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
            {/* Header with Title and View All Link */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="t-eyebrow text-[#0097CA] mb-1.5">
                  {language === "ar" ? "حسب الوجهة" : "BY DESTINATION"}
                </p>
                <h2 className="t-section-title text-xl sm:text-2xl font-bold text-black">
                  {language === "ar" ? "إلى أين، أولاً؟" : "Where to, first?"}
                </h2>
              </div>
              <Link
                href="/experiences"
                className="text-xs sm:text-sm font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 transition-colors"
              >
                <span>{language === "ar" ? "عرض الكل" : "View all"}</span>
                <span>→</span>
              </Link>
            </div>

            {/* Destination Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {WHERE_TO_DESTINATIONS.map((d) => {
                const isSelected = selectedWhereToDest.toLowerCase() === d.id.toLowerCase();
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedWhereToDest(d.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-gray-100/80 hover:bg-gray-200/80 text-black border-transparent"
                    }`}
                  >
                    {language === "ar" ? d.labelAr : d.label}
                  </button>
                );
              })}
            </div>

            {/* 4 Cards Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {whereToTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/experiences/${tour.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E9EE] shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image with badges */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                      />
                      {tour.savePercent > 0 && (
                        <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10">
                          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            Save {tour.savePercent}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA]">
                        {language === "ar" && tour.destinationAr ? tour.destinationAr : tour.destination}{" "}
                        ·{" "}
                        <span className="text-[#808283] font-normal">
                          {tour.duration}
                        </span>
                      </div>

                      <h3 className="text-[13.5px] font-semibold text-black group-hover:text-[#0097CA] transition-colors leading-snug line-clamp-2 min-h-[38px]">
                        {language === "ar" && tour.titleAr ? tour.titleAr : tour.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[11px] pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#0097CA] text-[#0097CA]" />
                        <span className="font-bold text-black">{tour.rating}</span>
                        <span className="text-[#808283]">
                          ({tour.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="p-4 pt-2 border-t border-gray-100 flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-[#808283] block leading-none">
                        {language === "ar" ? "يبدأ من" : "From"}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-black">
                          {formatPrice(tour.price)}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-[11px] text-[#808283] line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#0097CA] group-hover:text-[#007EA8] flex items-center gap-0.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{language === "ar" ? "عرض" : "View"}</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 4: WATCH FIRST, THEN BOOK (5 VIDEO REEL CARDS)
            ============================================================== */}
        <section className="bg-[#071622] py-16 lg:py-20 text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-8">
            <div>
              <p className="t-eyebrow text-cyan-300 mb-1.5 tracking-wider">
                {language === "ar" ? "شاهد أولاً، ثم احجز" : "WATCH FIRST, THEN BOOK"}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight">
                {language === "ar"
                  ? "شاهد ما ستخوضه في تجربتك."
                  : "See what you’re signing up for."}
              </h2>
            </div>

            {/* 5 Vertical Story Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
              {VIDEO_REELS.map((reel) => (
                <Link
                  key={reel.id}
                  href={reel.href}
                  className="group relative rounded-2xl overflow-hidden aspect-[9/15] bg-[#0E283C] shadow-2xl border border-white/10 flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1 cursor-pointer block"
                >
                  {/* Poster Image */}
                  <Image
                    src={reel.poster}
                    alt={reel.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

                  {/* Circular Play Button Center */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/35 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="relative z-10 space-y-2">
                    <p className="text-xs font-semibold text-white/95 line-clamp-1 drop-shadow-sm">
                      {language === "ar" ? reel.titleAr : reel.title}
                    </p>
                    <span className="block text-center w-full py-2.5 rounded-full bg-white group-hover:bg-cyan-50 text-[#071622] text-xs font-bold transition-all shadow-md">
                      {language === "ar" ? "احجز هذه التجربة" : "Book this experience"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 5: WHERE WE GO (5 DESTINATION CARDS)
            ============================================================== */}
        <section className="bg-[#FAFBFC] py-14 lg:py-20 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="t-section-title text-xl sm:text-2xl font-bold text-black">
                  {language === "ar" ? "أين نذهب" : "Where we go"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {language === "ar"
                    ? "وجهات متميزة. مئات الطرق لتجربتها."
                    : "Five destinations. Hundreds of ways to experience them."}
                </p>
              </div>
              <Link
                href="/experiences"
                className="text-xs sm:text-sm font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 transition-colors"
              >
                <span>{language === "ar" ? "عرض الكل" : "View all"}</span>
                <span>→</span>
              </Link>
            </div>

            {/* 5 Destination Showcase Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {WHERE_WE_GO_DESTINATIONS.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="group flex flex-col no-underline cursor-pointer"
                >
                  <div className="relative rounded-[20px] overflow-hidden aspect-[3/4] mb-2.5 shadow-sm group-hover:shadow-xl transition-all duration-300 border border-gray-200/80">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-white">
                      <div className="text-sm sm:text-base font-bold leading-tight">
                        {language === "ar" ? dest.nameAr : dest.name}
                      </div>
                      <div className="text-[11px] text-white/70 mt-0.5">
                        {language === "ar" ? dest.experienceCountAr : dest.experienceCount}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-gray-500 leading-snug line-clamp-1">
                    {language === "ar" ? dest.taglineAr : dest.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 6: DESTINATION SPOTLIGHT (EGYPT IN OCTOBER)
            ============================================================== */}
        <section className="relative bg-[#091D2C] text-white py-14 lg:py-20 overflow-hidden">
          {/* Subtle Silhouette Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <Image
              src="/images/dest_cairo.jpg"
              alt="Egypt Silhouette"
              fill
              className="object-cover object-center filter saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#091D2C] via-[#091D2C]/80 to-[#091D2C]/90" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Column: Editorial Headline & Action */}
              <div className="space-y-4">
                <p className="t-eyebrow text-cyan-300 tracking-wider">
                  {language === "ar" ? "تسليط الضوء على وجهة" : "DESTINATION SPOTLIGHT"}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.12] tracking-tight">
                  {language === "ar"
                    ? "مصر في الخريف. النيل دون حشود."
                    : "Egypt in October. The Nile, with no crowds."}
                </h2>
                <p className="text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed">
                  {language === "ar"
                    ? "هواء عليل، ضوء ذهبي، ومسارات الفلوكة النيلية التي يفضلها المرشدون حقاً."
                    : "Cooler air, golden light, and the felucca routes guides actually want to run."}
                </p>
                <div className="pt-2">
                  <Link
                    href="/destinations/cairo"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
                  >
                    <span>{language === "ar" ? "استكشف رحلات مصر" : "See Egypt journeys"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 2x2 Stat Widgets */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">22°C</div>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-snug">
                    {language === "ar" ? "متوسط حرارة أكتوبر على النيل" : "Average October temperature on the Nile"}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">68%</div>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-snug">
                    {language === "ar" ? "أكثر هدوءاً من موسم الذروة" : "Quieter than peak Dec-Feb season"}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">9</div>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-snug">
                    {language === "ar" ? "رحلات منسقة (2 إلى 14 يوماً)" : "Curated Egypt journeys, 2-14 days"}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">★ 4.9</div>
                  <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-snug">
                    {language === "ar" ? "186 تقييماً موثقاً من عام 2025" : "186 verified reviews from 2025"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dot Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-6 h-1.5 rounded-full bg-cyan-300" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 7: THE OCEANAIR STANDARD (SMALL DETAILS)
            ============================================================== */}
        <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              {/* Left Column: Narrative and 3 Pillars */}
              <div className="space-y-6">
                <div>
                  <p className="t-eyebrow text-[#0097CA] mb-2 tracking-wider">
                    {language === "ar" ? "معايير جوّ قطر العالية" : "THE OCEANAIR STANDARD"}
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black leading-tight tracking-tight">
                    {language === "ar"
                      ? "تفاصيل دقيقة، يخطط لها من يديرون الرحلة بأنفسهم."
                      : "Small details, planned by people who actually run the trip."}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-black/75 leading-relaxed">
                  {language === "ar"
                    ? "نحرص على دقة التجربة وقرب فريق الإرشاد ووضوح التنسيق من لحظة الحجز وحتى الاستقبال. لتشعر بأنك ضيف مرحب به في كل خطوة."
                    : "We keep the catalogue tight, the guide teams close, and the handoff clear from booking to pickup. The result feels less like buying a ticket and more like being expected."}
                </p>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="space-y-1">
                    <strong className="block text-xs sm:text-[13px] font-bold text-black">
                      {language === "ar" ? "مسارات منتقاة" : "Curated routes"}
                    </strong>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
                      {language === "ar"
                        ? "لا مسارات مجهولة؛ لكل تجربة مسؤول محلي موثوق."
                        : "No anonymous inventory. Every experience has a local owner."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-xs sm:text-[13px] font-bold text-black">
                      {language === "ar" ? "لوجستيات واضحة" : "Clear logistics"}
                    </strong>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
                      {language === "ar"
                        ? "مواعيد الاستقبال، التذاكر، وتعليمات المرشد مؤكدة سلفاً."
                        : "Pickup windows, tickets, and guide notes are confirmed upfront."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="block text-xs sm:text-[13px] font-bold text-black">
                      {language === "ar" ? "توقيت مدروس" : "Guest-first timing"}
                    </strong>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
                      {language === "ar"
                        ? "أوقات الغروب، تجنب الزحام، والطقس تحدد الجدول بدقة."
                        : "Sunset, crowds, weather, and pacing shape the schedule."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Signature Media Card with Land Cruiser */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-2xl border border-gray-200/80 bg-gray-100 group">
                <Image
                  src="/brand/signature-standard-poster.jpg"
                  alt="OceanAir Safari Guide Team Briefing"
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Pill Callout */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 text-xs font-semibold text-black border border-gray-200/80 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0097CA]/15 text-[#0097CA] flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-[11.5px] sm:text-xs leading-snug text-black/85">
                    {language === "ar"
                      ? "فرق الإرشاد تتلقى إيجازاً كاملاً قبل كل رحلة لضمان أرقى معايير الخدمة."
                      : "Guide teams are briefed before every departure. Routes, guest notes, and timing are reviewed before pickup."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 8: PICK A MOOD, WE'LL PICK THE TOUR (8 CARDS)
            ============================================================== */}
        <section className="bg-[#FAFBFC] py-16 lg:py-20 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="t-eyebrow text-[#0097CA] mb-1.5">
                  {language === "ar" ? "خصيصاً لك" : "FOR YOU"}
                </p>
                <h2 className="t-section-title text-xl sm:text-2xl font-bold text-black">
                  {language === "ar" ? "اختر الأجواء، ودعنا ننتقي لك الجولة." : "Pick a mood, we’ll pick the tour."}
                </h2>
              </div>
              <Link
                href="/experiences"
                className="text-xs sm:text-sm font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 transition-colors"
              >
                <span>{language === "ar" ? "عرض الكل" : "View all"}</span>
                <span>→</span>
              </Link>
            </div>

            {/* Mood Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-white hover:bg-gray-100 text-black border-gray-200/80"
                    }`}
                  >
                    {language === "ar" ? mood.labelAr : mood.label}
                  </button>
                );
              })}
            </div>

            {/* 8 Tour Cards (2 Rows of 4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {moodTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/experiences/${tour.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E9EE] shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image with badges */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                      />
                      {tour.savePercent > 0 && (
                        <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10">
                          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            Save {tour.savePercent}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA]">
                        {language === "ar" && tour.destinationAr ? tour.destinationAr : tour.destination}{" "}
                        ·{" "}
                        <span className="text-[#808283] font-normal">
                          {tour.duration}
                        </span>
                      </div>

                      <h3 className="text-[13.5px] font-semibold text-black group-hover:text-[#0097CA] transition-colors leading-snug line-clamp-2 min-h-[38px]">
                        {language === "ar" && tour.titleAr ? tour.titleAr : tour.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-[11px] pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#0097CA] text-[#0097CA]" />
                        <span className="font-bold text-black">{tour.rating}</span>
                        <span className="text-[#808283]">
                          ({tour.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="p-4 pt-2 border-t border-gray-100 flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-[#808283] block leading-none">
                        {language === "ar" ? "يبدأ من" : "From"}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-black">
                          {formatPrice(tour.price)}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-[11px] text-[#808283] line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#0097CA] group-hover:text-[#007EA8] flex items-center gap-0.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{language === "ar" ? "عرض" : "View"}</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 9: MULTI-DAY JOURNEYS (3 CARDS)
            ============================================================== */}
        <section className="bg-white py-16 lg:py-20 border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="t-section-title text-xl sm:text-2xl font-bold text-black">
                  {language === "ar" ? "رحلات متعددة الأيام" : "Multi-day journeys"}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {language === "ar"
                    ? "رحلات غامرة وممتدة عبر قطر، الإمارات، مصر، والخليج — بإرشاد متكامل."
                    : "Immersive trips across the UAE, Egypt, Croatia and Oman — guided end to end."}
                </p>
              </div>
              <Link
                href="/multiday"
                className="text-xs sm:text-sm font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 transition-colors"
              >
                <span>{language === "ar" ? "عرض الكل" : "View all"}</span>
                <span>→</span>
              </Link>
            </div>

            {/* 3 Multi-day Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MULTIDAY_JOURNEYS.map((item) => (
                <Link
                  key={item.id}
                  href={`/experiences/${item.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E9EE] shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image with MULTI-DAY & Date Pill */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                      />
                      {/* Top Left Badge */}
                      <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10">
                        <span className="bg-black/80 backdrop-blur-xs text-white text-[9.5px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                          MULTI-DAY
                        </span>
                      </div>
                      {/* Bottom Date Pill */}
                      <div className="absolute bottom-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10">
                        <span className="bg-white/95 backdrop-blur-xs text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          {language === "ar" ? item.nextDateAr : item.nextDate}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA]">
                        {language === "ar" ? item.destinationAr : item.destination}
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-black group-hover:text-[#0097CA] transition-colors leading-snug line-clamp-2 min-h-[44px]">
                        {language === "ar" ? item.titleAr : item.title}
                      </h3>

                      <div className="flex items-center gap-1 text-[11px] pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#0097CA] text-[#0097CA]" />
                        <span className="font-bold text-black">{item.rating}</span>
                        <span className="text-[#808283]">
                          ({item.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="p-4 pt-2 border-t border-gray-100 flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-[#808283] block leading-none">
                        {language === "ar" ? "يبدأ من" : "From"}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-black">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#0097CA] group-hover:text-[#007EA8] flex items-center gap-0.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{language === "ar" ? "عرض التجربة" : "View experience"}</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 10: WHY BOOK WITH US (STAT BLOCKS)
            ============================================================== */}
        <section className="bg-[#FAFBFC] py-14 lg:py-20 border-b border-gray-200/80">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 lg:gap-14 items-center">
              {/* Left Column: Heading & Subtitle */}
              <div className="space-y-2">
                <p className="t-eyebrow text-[#0097CA] mb-1.5 tracking-wider">
                  {language === "ar" ? "لماذا تحجز معنا" : "WHY BOOK WITH US"}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-black leading-snug">
                  {language === "ar"
                    ? "فريق عمل متمرس يقود هذه التجارب منذ عام 2010."
                    : "A Dubai-based team that’s been running these tours since 2010."}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {language === "ar"
                    ? "نحن من نصمم التجارب، ندرب المرشدين، ونجيب على كل استفساراتكم مباشرة."
                    : "We design the experiences, train the guides, and answer the phone."}
                </p>
              </div>

              {/* Right Column: 3 Stat Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 lg:pt-0">
                <div className="space-y-1 border-l sm:border-l-0 sm:border-r rtl:border-l-0 rtl:border-r-0 rtl:sm:border-l border-gray-200 px-3">
                  <div className="text-3xl font-extrabold text-black">2010</div>
                  <div className="text-xs font-semibold text-gray-700">
                    {language === "ar" ? "خبرة وعمل مستمر" : "Operating since"}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    {language === "ar"
                      ? "فريق محلي متخصص: تتحدث مباشرة مع من يدير رحلتك."
                      : "Dubai-based: you talk to the team that runs the tour."}
                  </p>
                </div>

                <div className="space-y-1 border-l sm:border-l-0 sm:border-r rtl:border-l-0 rtl:border-r-0 rtl:sm:border-l border-gray-200 px-3">
                  <div className="text-3xl font-extrabold text-black">20k+</div>
                  <div className="text-xs font-semibold text-gray-700">
                    {language === "ar" ? "حجز كل شهر" : "Bookings every month"}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    {language === "ar"
                      ? "عبر قطر، الإمارات، مصر، السعودية، وسلطنة عمان."
                      : "Across UAE, Egypt, Croatia, Saudi Arabia, and Oman."}
                  </p>
                </div>

                <div className="space-y-1 px-3">
                  <div className="text-3xl font-extrabold text-amber-500">★ 4.9</div>
                  <div className="text-xs font-semibold text-gray-700">
                    {language === "ar" ? "عبر 80 ألف تقييم" : "Across 80K+ reviews"}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    {language === "ar"
                      ? "تقييمات مجمعة من كبرى منصات السفر العالمية."
                      : "Blended from several top partner platforms."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
