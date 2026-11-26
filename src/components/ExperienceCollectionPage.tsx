"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Star,
  Calendar,
  Tag,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";

export interface CollectionTour {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  destination: string;
  destinationAr?: string;
  duration: string;
  durationAr?: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  savePercent?: number;
  isBestseller?: boolean;
  hasTripAdvisorBadge?: boolean;
  hasMichelinBadge?: boolean;
  image: string;
}

export interface ExperienceCollectionProps {
  slug?: string;
  destinationName?: string;
  destinationNameAr?: string;
  collectionTitle?: string;
  collectionTitleAr?: string;
  collectionSubtitle?: string;
  collectionSubtitleAr?: string;
  heroImage?: string;
  toursCount?: number;
  averageRating?: number;
  lowestPrice?: number;
}

// Curated Qatar Desert & Highlights Tours
const DEFAULT_QATAR_DESERT_TOURS: CollectionTour[] = [
  {
    id: "qatar-overnight-safari",
    slug: "overnight-desert-safari-qatar",
    title: "Overnight Desert Safari Experience Qatar",
    titleAr: "تجربة سفاري صحراوي مبيت في قطر",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "Overnight",
    durationAr: "مبيت",
    rating: 4.95,
    reviews: 1420,
    price: 1800,
    originalPrice: 2000,
    isBestseller: true,
    savePercent: 10,
    hasTripAdvisorBadge: true,
    hasMichelinBadge: true,
    image: "/images/desert_safari_overnight.jpg",
  },
  {
    id: "qatar-halfday-safari",
    slug: "half-day-desert-safari-inland-sea-qatar",
    title: "Half Day Desert Safari with Inland Sea Qatar",
    titleAr: "سفاري صحراوي نصف يوم إلى البحر الداخلي (خور العديد)",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.92,
    reviews: 3200,
    price: 600,
    originalPrice: 700,
    isBestseller: true,
    savePercent: 14,
    hasTripAdvisorBadge: true,
    image: "/images/desert_safari_halfday.jpg",
  },
  {
    id: "qatar-sunrise-safari",
    slug: "sunrise-desert-safari",
    title: "Sunrise Desert Safari with Inland Sea View",
    titleAr: "سفاري شروق الشمس الصحراوي مع إطلالة البحر الداخلي",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.91,
    reviews: 980,
    price: 700,
    originalPrice: 800,
    savePercent: 12,
    hasTripAdvisorBadge: true,
    image: "/images/desert_safari_sunrise.jpg",
  },
  {
    id: "qatar-sunset-safari",
    slug: "sunset-desert-safari",
    title: "Sunset Desert Safari with Dune Bashing & Camels",
    titleAr: "سفاري غروب الشمس الصحراوي مع الكثبان الرملية وركوب الجمال",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.94,
    reviews: 2150,
    price: 700,
    originalPrice: 800,
    isBestseller: true,
    savePercent: 12,
    hasTripAdvisorBadge: true,
    image: "/images/desert_safari_sunset.jpg",
  },
  {
    id: "qatar-fullday-quad-safari",
    slug: "full-day-desert-safari-with-quad-bike-inland-sea",
    title: "Full Day Desert Safari with Quad Bike Inland Sea",
    titleAr: "سفاري صحراوي يوم كامل مع دراجات الدفع الرباعي والبحر الداخلي",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "8 hours",
    durationAr: "8 ساعات",
    rating: 4.93,
    reviews: 1120,
    price: 1000,
    originalPrice: 1200,
    savePercent: 16,
    hasTripAdvisorBadge: true,
    image: "/images/desert_safari_fullday_atv.jpg",
  },
  {
    id: "qatar-city-desert-combo",
    slug: "doha-city-tour-with-desert-safari-7-hours",
    title: "Doha City Tour with Desert Safari – 7 Hours Combo",
    titleAr: "جولة مدينة الدوحة مع سفاري الصحراء – 7 ساعات مدمجة",
    destination: "DOHA",
    destinationAr: "الدوحة",
    duration: "7 hours",
    durationAr: "7 ساعات",
    rating: 4.90,
    reviews: 890,
    price: 500,
    originalPrice: 600,
    savePercent: 17,
    hasTripAdvisorBadge: true,
    image: "/images/combo_city_desert_safari.jpg",
  }
];

const FAQS = [
  {
    question: "What is the best time to do a Desert Safari in Qatar?",
    questionAr: "ما هو أفضل وقت لرحلات السفاري الصحراوية في قطر؟",
    answer:
      "Sunrise and late afternoon/sunset safaris are the most popular because of comfortable temperatures and stunning photography lighting over the Inland Sea (Khor Al Adaid).",
    answerAr:
      "تعتبر رحلات شروق الشمس والغروب هي الأكثر شعبية نظراً لاعتدال درجات الحرارة وجمال الإضاءة الساحرة للتصوير فوق كثبان خور العديد.",
  },
  {
    question: "Is dune bashing safe for children and families?",
    questionAr: "هل قيادة الكثبان الرملية آمنة للأطفال والعائلات؟",
    answer:
      "Yes, our professional licensed 4x4 drivers adjust the driving intensity according to family preferences, and gentle scenic routes are always available.",
    answerAr:
      "نعم، سائقونا المحترفون والمرخصون يضبطون مستوى السرعة والمناورة بما يناسب العائلات والأطفال لضمان أقصى درجات الأمان والراحة.",
  },
  {
    question: "Are private transfers and hotel pickups included?",
    answer:
      "Yes, all tours include roundtrip pickup and drop-off in clean, modern, air-conditioned 4x4 Land Cruisers from anywhere in Doha, Hamad International Airport, or your hotel.",
    answerAr:
      "نعم، تشمل جميع رحلاتنا خدمة الاستقبال والتوصيل بسيارات لاند كروزر حديثة ومكيفة من أي فندق في الدوحة أو مطار حمد الدولي.",
  },
];

const MORE_EXPERIENCES = [
  {
    title: "Qatar City Tours",
    titleAr: "جولات وتجارب مدينة قطر",
    image: "/images/tour_lusail_city.jpg",
    href: "/experiences/doha-city-tours",
  },
  {
    title: "Museum & Cultural Tours",
    titleAr: "جولات المتاحف والتراث الثقافي",
    image: "/images/cat_cultural.jpg",
    href: "/experiences?category=Cultural",
  },
  {
    title: "Combo Tours",
    titleAr: "باقات الجولات المشتركة",
    image: "/images/combo_dhow_cruise.jpg",
    href: "/experiences?category=City",
  },
  {
    title: "Beyond Doha Tours",
    titleAr: "جولات ما وراء الدوحة",
    image: "/images/beyond_panda_house.jpg",
    href: "/experiences?category=Historical",
  },
  {
    title: "Adventure & Water Park Tours",
    titleAr: "جولات المغامرات والحدائق المائية",
    image: "/images/adventure_meryal_waterpark.jpg",
    href: "/experiences?category=Adventure",
  },
  {
    title: "Doha Desert Safari",
    titleAr: "سفاري صحراء الدوحة",
    image: "/images/desert_safari_sunset.jpg",
    href: "/experiences/doha-desert-safari",
  },
];

export function ExperienceCollectionPage({
  destinationName = "Doha",
  destinationNameAr = "الدوحة",
  collectionTitle = "Qatar Desert Safari.",
  collectionTitleAr = "سفاري صحراء قطر.",
  collectionSubtitle = "Thrilling dune bashing to the Inland Sea (Khor Al Adaid) and coastal Bedouin experiences.",
  collectionSubtitleAr = "قيادة الكثبان الرملية نحو خور العديد والتجارب البدوية الساحلية في قطر.",
  heroImage = "/images/dest_doha.jpg",
  toursCount = 6,
  averageRating = 4.92,
  lowestPrice = 500,
}: ExperienceCollectionProps) {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  // Filter States
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredTours = useMemo(() => {
    let list = [...DEFAULT_QATAR_DESERT_TOURS];

    if (selectedDuration === "under-5h") {
      list = list.filter((t) => t.duration.toLowerCase().includes("4 hours") || t.duration.toLowerCase().includes("half"));
    } else if (selectedDuration === "over-5h") {
      list = list.filter((t) => !t.duration.toLowerCase().includes("4 hours"));
    }

    if (selectedPriceRange === "under-700") {
      list = list.filter((t) => t.price <= 700);
    } else if (selectedPriceRange === "700-1200") {
      list = list.filter((t) => t.price >= 700 && t.price <= 1200);
    } else if (selectedPriceRange === "over-1200") {
      list = list.filter((t) => t.price > 1200);
    }

    if (selectedRating > 0) {
      list = list.filter((t) => t.rating >= selectedRating);
    }

    return list;
  }, [selectedDuration, selectedPriceRange, selectedRating]);

  const handleClearFilters = () => {
    setSelectedDuration("all");
    setSelectedPriceRange("all");
    setSelectedRating(0);
  };

  const featuredTour = DEFAULT_QATAR_DESERT_TOURS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-sans">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* SECTION 1: HERO HEADER */}
        <section className="relative min-h-[440px] sm:min-h-[500px] flex flex-col justify-end bg-[#071622] text-white overflow-hidden pb-12 pt-28">
          <Image
            src={heroImage}
            alt={collectionTitle}
            fill
            priority
            className="object-cover object-center opacity-40 filter saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071622] via-[#071622]/60 to-transparent" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 w-full">
            <nav className="flex items-center gap-2 text-xs text-cyan-300 font-semibold mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="opacity-60">›</span>
              <Link href="/destinations/doha" className="hover:underline">Doha, Qatar</Link>
              <span className="opacity-60">›</span>
              <span className="text-white font-semibold">
                {language === "ar"
                  ? collectionTitleAr.replace(/\.$/, "")
                  : collectionTitle.replace(/\.$/, "")}
              </span>
            </nav>

            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300 mb-2">
              {language === "ar"
                ? `${destinationNameAr.toUpperCase()} · جوّ قطر الرسمي`
                : `${collectionTitle.replace(/\.$/, "").toUpperCase()} · GOTT QATAR`}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white tracking-tight leading-[1.08] mb-3">
              {language === "ar" ? collectionTitleAr : collectionTitle}
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8">
              {language === "ar" ? collectionSubtitleAr : collectionSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs font-semibold text-white/95">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                <span>
                  {language === "ar"
                    ? `${toursCount} جولات متاحة`
                    : `${toursCount} tours available`}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>
                  {language === "ar"
                    ? `★ ${averageRating} متوسط التقييم`
                    : `★ ${averageRating} average rating`}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <Tag className="w-3.5 h-3.5 text-cyan-300" />
                <span>
                  {language === "ar"
                    ? `ابتداءً من ${formatPrice(lowestPrice)}`
                    : `From ${formatPrice(lowestPrice)}`}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === "ar" ? "متاح يومياً" : "Available daily"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURED EXPERIENCE */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 pt-10 sm:pt-12 pb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-5 tracking-tight">
            {language === "ar" ? "التجربة المميزة" : "Featured Experience"}
          </h2>

          <div className="rounded-[22px] overflow-hidden border border-gray-200/80 shadow-[0_16px_45px_rgba(7,22,34,0.08)] bg-[#071F30] text-white grid grid-cols-1 lg:grid-cols-12 group">
            <div className="relative min-h-[300px] sm:min-h-[380px] lg:col-span-7 overflow-hidden">
              <Image
                src={featuredTour.image}
                alt={featuredTour.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2 z-10">
                <span className="bg-black/90 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 shadow-sm">
                  {language === "ar" ? "الأكثر طلباً" : "BESTSELLER"}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#071622] text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span>🏆 Certified</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                    {language === "ar"
                      ? "الأفضل في سفاري صحراء قطر"
                      : "TOP IN QATAR DESERT SAFARI"}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10.5px] font-semibold text-white/90">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {language === "ar" ? "متاح يومياً" : "Daily departures"}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-3">
                  {language === "ar" ? featuredTour.titleAr : featuredTour.title}
                </h3>

                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>

                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed text-white/90 italic">
                  <p className="mb-2">
                    {language === "ar"
                      ? "“كانت تجربة مذهلة في كثبان خور العديد الرملية. المرشد وسائق اللاندكروزر كانا محترفين للغاية وشعرنا براحة وأمان تامين.”"
                      : "“An unforgettable experience at the Inland Sea sand dunes. The licensed 4x4 driver was incredible and we felt completely safe and exhilarated.”"}
                  </p>
                  <p className="text-[11px] font-semibold not-italic text-cyan-300">
                    Verified Guest Review · 2026
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10.5px] text-gray-300 block">
                    {language === "ar" ? "السعر للشخص" : "Price from"}
                  </span>
                  <div className="text-2xl font-extrabold text-white">
                    {formatPrice(featuredTour.price)}
                  </div>
                </div>

                <Link
                  href={`/experiences/${featuredTour.slug}`}
                  className="px-6 py-3 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
                >
                  {language === "ar" ? "احجز الآن" : "Book Experience"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ALL COLLECTION TOURS */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                {language === "ar" ? "جميع الجولات المتاحة" : "Available Tours"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {language === "ar"
                  ? `عرض ${filteredTours.length} جولة منسقة`
                  : `Showing ${filteredTours.length} curated experiences`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer self-start sm:self-auto"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "تصفية" : "Filters"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/experiences/${tour.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                        {tour.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA]">
                      {language === "ar" ? tour.destinationAr : tour.destination}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-black group-hover:text-[#0097CA] transition-colors leading-snug line-clamp-2 min-h-[44px]">
                      {language === "ar" ? tour.titleAr : tour.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-black">{tour.rating}</span>
                      <span className="text-gray-400">({tour.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-gray-100 flex items-baseline justify-between mt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 block">
                      {language === "ar" ? "السعر" : "From"}
                    </span>
                    <span className="text-base font-bold text-black">
                      {formatPrice(tour.price)}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#0097CA] group-hover:underline">
                    {language === "ar" ? "عرض التفاصيل →" : "View tour →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 4: FAQS */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-10">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
            {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left rtl:text-right font-bold text-sm sm:text-base text-black cursor-pointer hover:bg-gray-50/50"
                  >
                    <span>{language === "ar" ? faq.questionAr : faq.question}</span>
                    <span className="text-[#0097CA] shrink-0">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {language === "ar" ? faq.answerAr : faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: MORE EXPERIENCES CAROUSEL */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-10">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">
            {language === "ar" ? "استكشف المزيد من تجارب قطر" : "Explore More Qatar Experiences"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MORE_EXPERIENCES.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-[#0097CA] transition-all cursor-pointer"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2.5 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-bold text-black group-hover:text-[#0097CA] transition-colors leading-snug">
                  {language === "ar" ? item.titleAr : item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FILTER MODAL */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0097CA]" />
                  <span>{language === "ar" ? "تصفية التجارب" : "Filter Experiences"}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {language === "ar" ? "المدة" : "Duration"}
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-black cursor-pointer"
                  >
                    <option value="all">{language === "ar" ? "الكل" : "All Durations"}</option>
                    <option value="under-5h">{language === "ar" ? "نصف يوم (أقل من 5 ساعات)" : "Half Day (Under 5 hours)"}</option>
                    <option value="over-5h">{language === "ar" ? "يوم كامل أو مبيت (5+ ساعات)" : "Full Day or Overnight (5+ hours)"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {language === "ar" ? "نطاق السعر (بالريال القطري)" : "Price Range (QAR)"}
                  </label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-black cursor-pointer"
                  >
                    <option value="all">{language === "ar" ? "جميع الأسعار" : "All Prices"}</option>
                    <option value="under-700">{language === "ar" ? "أقل من 700 QAR" : "Under QAR 700"}</option>
                    <option value="700-1200">{language === "ar" ? "700 - 1,200 QAR" : "QAR 700 - 1,200"}</option>
                    <option value="over-1200">{language === "ar" ? "أكثر من 1,200 QAR" : "Over QAR 1,200"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {language === "ar" ? "التقييم" : "Rating"}
                  </label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-black cursor-pointer"
                  >
                    <option value="0">{language === "ar" ? "جميع التقييمات" : "Any rating"}</option>
                    <option value="4.9">{language === "ar" ? "★ 4.9 وأعلى" : "★ 4.9 & up"}</option>
                    <option value="4.8">{language === "ar" ? "★ 4.8 وأعلى" : "★ 4.8 & up"}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                >
                  {language === "ar" ? "إعادة تعيين" : "Reset"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  {language === "ar" ? `عرض ${filteredTours.length} جولات` : `Show ${filteredTours.length} tours`}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
