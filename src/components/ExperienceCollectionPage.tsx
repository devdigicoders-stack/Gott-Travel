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

// 10 Curated Tours for Dubai Desert Safari matching experiencepagemodelcomponent.png
const DEFAULT_DUBAI_DESERT_TOURS: CollectionTour[] = [
  {
    id: "exp-1",
    slug: "dubai-premium-safari-camel-ride-al-khayma-camp-3-buffets",
    title: "Dubai: Premium Safari, Camel Ride & Al Khayma Camp 3 Buffets",
    titleAr: "دبي: سفاري فاخر، ركوب الجمال ومخيم الخيمة التراثي مع 3 بوفيهات",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "7 hours",
    durationAr: "7 ساعات",
    rating: 4.9,
    reviews: 30565,
    price: 87.51,
    originalPrice: 97.23,
    savePercent: 10,
    isBestseller: true,
    hasTripAdvisorBadge: true,
    hasMichelinBadge: true,
    image: "/images/exp_safari_alkhayma.jpg",
  },
  {
    id: "exp-2",
    slug: "dubai-half-day-desert-safari-quad-bike-camels-sandboarding",
    title: "Dubai: Half-Day Desert Safari, Quad Bike, Camels & Sandboarding",
    titleAr: "دبي: سفاري صحراوي نصف يوم، دراجات رباعية، ركوب الجمال والتزلج على الرمال",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.9,
    reviews: 70280,
    price: 31.62,
    originalPrice: 35.13,
    savePercent: 10,
    isBestseller: true,
    image: "/images/exp_half_day_quad.jpg",
  },
  {
    id: "exp-3",
    slug: "arabian-night-desert-experience-camel-ride-wildlife-stargazing",
    title: "Arabian Night Desert Experience: Camel Ride, Wildlife & Stargazing",
    titleAr: "تجربة ليلة عربية في الصحراء: ركوب الجمال، الحياة البرية ومراقبة النجوم",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.8,
    reviews: 1799,
    price: 38.3,
    originalPrice: 42.55,
    savePercent: 10,
    isBestseller: true,
    image: "/images/exp_alkhayma_bbq.jpg",
  },
  {
    id: "exp-4",
    slug: "dubai-overnight-safari-dinner-stargazing-al-khayma-camp",
    title: "Dubai: Overnight Safari, Dinner, Stargazing & Al Khayma Camp",
    titleAr: "دبي: سفاري مبيت، عشاء مشاوي، مراقبة النجوم ومخيم الخيمة",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "16 hours",
    durationAr: "16 ساعة",
    rating: 4.8,
    reviews: 2632,
    price: 146.96,
    originalPrice: 163.29,
    savePercent: 10,
    isBestseller: true,
    image: "/images/exp_overnight_safari.jpg",
  },
  {
    id: "exp-5",
    slug: "dubai-evening-heritage-safari-in-vintage-g-class-at-al-marmoom",
    title: "Dubai: Evening Heritage Safari in Vintage G-Class at Al Marmoom",
    titleAr: "دبي: سفاري تراثي مسائي بسيارات جي كلاس الكلاسيكية في المرموم",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "5 hours",
    durationAr: "5 ساعات",
    rating: 4.8,
    reviews: 489,
    price: 170.71,
    isBestseller: true,
    hasTripAdvisorBadge: true,
    hasMichelinBadge: true,
    image: "/images/exp_heritage_vintage_gclass.jpg",
  },
  {
    id: "exp-6",
    slug: "al-marmoom-dome-luxury-desert-experiential-stay",
    title: "Al Marmoom Dome Luxury Desert Experiential Stay",
    titleAr: "إقامة تجريبية فاخرة في قباب محمية المرموم الصحراوية",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "22 hours",
    durationAr: "22 ساعة",
    rating: 4.8,
    reviews: 191,
    price: 741.96,
    isBestseller: true,
    image: "/images/exp_marmoom_dome.jpg",
  },
  {
    id: "exp-7",
    slug: "dubai-red-dune-quad-biking-camel-ride-al-khayma-camp-bbq",
    title: "Dubai: Red Dune Quad Biking, Camel Ride, Al Khayma Camp & BBQ",
    titleAr: "دبي: قيادة الدراجات الرباعية في الرمال الحمراء، ركوب الجمال وعشاء باربكيو",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "6 hours",
    durationAr: "6 ساعات",
    rating: 4.9,
    reviews: 1939,
    price: 92.85,
    originalPrice: 103.17,
    savePercent: 10,
    image: "/images/exp_red_dune_quad.jpg",
  },
  {
    id: "exp-8",
    slug: "dubai-desert-adventure-dune-buggy-camel-ride-bbq-at-al-khayma",
    title: "Dubai Desert Adventure: Dune Buggy, Camel Ride & BBQ at Al Khayma",
    titleAr: "مغامرة صحراء دبي: عربات الدون باجي، ركوب الجمال وعشاء في الخيمة",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.9,
    reviews: 683,
    price: 220.88,
    originalPrice: 245.42,
    savePercent: 10,
    image: "/images/exp_dune_buggy.jpg",
  },
  {
    id: "exp-9",
    slug: "dubai-sunset-camel-horse-ride-with-bbq-at-al-khayma-camp",
    title: "Dubai: Sunset Camel & Horse Ride with BBQ at Al Khayma Camp",
    titleAr: "دبي: ركوب الخيل والجمال وقت الغروب مع عشاء مشاوي في مخيم الخيمة",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "6 hours",
    durationAr: "6 ساعات",
    rating: 4.8,
    reviews: 2649,
    price: 89.96,
    originalPrice: 99.95,
    savePercent: 10,
    image: "/images/exp_horse_riding.jpg",
  },
  {
    id: "exp-10",
    slug: "dubai-quad-biking-sandboarding-camel-ride-with-refreshments",
    title: "Dubai: Quad Biking, Sandboarding & Camel Ride with Refreshments",
    titleAr: "دبي: قيادة الدراجات الرباعية والتزلج على الرمال وركوب الجمال مع ضيافة",
    destination: "Dubai",
    destinationAr: "دبي",
    duration: "4 hours",
    durationAr: "4 ساعات",
    rating: 4.9,
    reviews: 3166,
    price: 56.33,
    originalPrice: 62.59,
    savePercent: 10,
    image: "/images/feat_sandboarding.jpg",
  },
];

// FAQs matching experiencepagemodelcomponent.png
const FAQS = [
  {
    question: "How do I book an experience or tour online?",
    questionAr: "كيف يمكنني حجز تجربة أو جولة سياحية عبر الإنترنت؟",
    answer:
      "Browse the tours, experiences and tickets on our site, pick the one you want, check availability for your date, and complete the booking through our secure online checkout. You'll get a confirmation email with your booking and payment details right after.",
    answerAr:
      "تصفح الجولات والتجارب والتذاكر على موقعنا، واختر ما يناسبك، ثم تحقق من التوافر للتاريخ المحدد، وأتم عملية الحجز عبر الدفع الإلكتروني الآمن. ستتلقى رسالة تأكيد إلكترونية تحتوي على تفاصيل الحجز والدفع مباشرة.",
  },
  {
    question: "What is your cancellation policy?",
    questionAr: "ما هي سياسة الإلغاء لديكم؟",
    answer:
      "We offer free cancellation up to 24 hours before your experience begins on almost all tours. You receive a 100% full refund with no hidden charges or cancellation penalties.",
    answerAr:
      "نقدم ميزة الإلغاء المجاني حتى 24 ساعة قبل موعد بدء التجربة لمعظم الرحلات. ستحصل على استرداد كامل بنسبة 100% دون أي رسوم إضافية.",
  },
  {
    question: "How do I pay, and is my payment secure?",
    questionAr: "كيف يتم الدفع، وهل بياناتي ومعاملاتي المالية آمنة؟",
    answer:
      "All payments are processed through secure 256-bit encrypted gateways. We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay in AED, USD, and EUR.",
    answerAr:
      "تتم جميع المدفوعات عبر بوابات مشفرة وآمنة بتقنية 256 بت. نقبل بطاقات فيزا، ماستركارد، أمريكان إكسبريس، آبل باي، وجوجل باي بالدرهم الإماراتي، والدولار الأمريكي، واليورو.",
  },
  {
    question: "Is there a surcharge on card payments?",
    questionAr: "هل توجد أي رسوم إضافية على الدفع بالبطاقات الائتمانية؟",
    answer:
      "No, there are zero credit card surcharges or booking fees. The price you see is the final price you pay.",
    answerAr:
      "لا، لا توجد أي رسوم إضافية على بطاقات الائتمان أو رسوم حجز خفية. السعر المعروض هو السعر الإجمالي والنهائي.",
  },
  {
    question: "What safety measures are in place?",
    questionAr: "ما هي معايير وإجراءات السلامة المتبعة؟",
    answer:
      "All safari vehicles are fitted with roll cages, first-aid kits, GPS tracking, and comprehensive commercial passenger insurance. Drivers are licensed desert conservation guides certified in first aid.",
    answerAr:
      "جميع مركبات السفاري مجهزة بأقفاص حماية داخلية، وحقائب إسعافات أولية، وأنظمة تتبع، وتأمين شامل. السائقون مرخصون وخبراء في القيادة الصحراوية ومعتمدون في الإسعافات الأولية.",
  },
  {
    question: "Can I customise a tour, and do you offer transfers?",
    questionAr: "هل يمكن تخصيص الجولة السياحية، وهل توفرون خدمات النقل؟",
    answer:
      "Yes, private custom tours and VIP transfers are available on request. Hotel pickup and drop-off in air-conditioned vehicles is included with all tours.",
    answerAr:
      "نعم، تتوفر رحلات خاصة حسب الطلب ونقل VIP فاخر. يشمل الحجز خدمة الاستقبال والتوصيل من وإلى الفندق بمركبات مكيفة ومريحة.",
  },
];

// 4 More Experiences squircle cards
const MORE_EXPERIENCES = [
  {
    title: "Abu Dhabi City Tours",
    titleAr: "جولات مدينة أبوظبي",
    image: "/images/dest_abu_dhabi.jpg",
    href: "/experiences/abu-dhabi-city-tours",
  },
  {
    title: "Dubai City Tours",
    titleAr: "جولات مدينة دبي",
    image: "/images/exp_alfahidi_walking.jpg",
    href: "/experiences/dubai-city-tours",
  },
  {
    title: "Abu Dhabi Desert Safari",
    titleAr: "سفاري صحراء أبوظبي",
    image: "/images/exp_abu_dhabi_safari.jpg",
    href: "/experiences/abu-dhabi-desert-safari",
  },
  {
    title: "Doha Desert Safari",
    titleAr: "سفاري صحراء الدوحة",
    image: "/images/dest_doha.jpg",
    href: "/experiences/doha-desert-safari",
  },
];

export function ExperienceCollectionPage({
  destinationName = "Dubai",
  destinationNameAr = "دبي",
  collectionTitle = "Dubai Desert Safari.",
  collectionTitleAr = "سفاري صحراء دبي.",
  collectionSubtitle = "Dune bashing, camel rides and desert camps across Dubai.",
  collectionSubtitleAr = "قيادة الكثبان الرملية وركوب الجمال والمخيمات الصحراوية التراثية في دبي.",
  heroImage = "/brand/hero/home-hero.jpg",
  toursCount = 10,
  averageRating = 4.8,
  lowestPrice = 31.62,
}: ExperienceCollectionProps) {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  // Filter States
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<string>("recommended");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Accordion state (item 0 open by default as in screenshot)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    let list = [...DEFAULT_DUBAI_DESERT_TOURS];

    // Duration filter
    if (selectedDuration === "under-5h") {
      list = list.filter((t) => {
        const hours = parseInt(t.duration) || 0;
        return hours <= 5;
      });
    } else if (selectedDuration === "over-5h") {
      list = list.filter((t) => {
        const hours = parseInt(t.duration) || 0;
        return hours > 5;
      });
    }

    // Price range filter
    if (selectedPriceRange === "under-50") {
      list = list.filter((t) => t.price < 50);
    } else if (selectedPriceRange === "50-100") {
      list = list.filter((t) => t.price >= 50 && t.price <= 100);
    } else if (selectedPriceRange === "over-100") {
      list = list.filter((t) => t.price > 100);
    }

    // Rating filter
    if (selectedRating > 0) {
      list = list.filter((t) => t.rating >= selectedRating);
    }

    // Sorting
    if (selectedSort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "popular") {
      list.sort((a, b) => b.reviews - a.reviews);
    }

    return list;
  }, [selectedDuration, selectedPriceRange, selectedRating, selectedSort]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDuration !== "all") count++;
    if (selectedPriceRange !== "all") count++;
    if (selectedTimeOfDay !== "all") count++;
    if (selectedRating > 0) count++;
    return count;
  }, [selectedDuration, selectedPriceRange, selectedTimeOfDay, selectedRating]);

  const handleClearFilters = () => {
    setSelectedDuration("all");
    setSelectedPriceRange("all");
    setSelectedTimeOfDay("all");
    setSelectedRating(0);
    setSelectedSort("recommended");
  };

  const featuredTour = DEFAULT_DUBAI_DESERT_TOURS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-montserrat">
      <Navbar />

      <main className="flex-1">
        {/* ==============================================================
            SECTION 1: BREADCRUMBS & HERO HEADER (Matches Screenshot)
            ============================================================== */}
        <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 text-white overflow-hidden bg-[#0A1E3F]">
          {/* Background Image with Dark Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={collectionTitle}
              fill
              priority
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071622]/95 via-[#071622]/65 to-[#071622]/80" />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
            {/* Breadcrumb row */}
            <nav className="flex items-center gap-2 text-xs text-white/80 font-medium mb-3">
              <Link href="/" className="hover:text-cyan-300 transition-colors">
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span className="opacity-60">›</span>
              <Link
                href={`/experiences?destination=${encodeURIComponent(destinationName)}`}
                className="hover:text-cyan-300 transition-colors"
              >
                {language === "ar" ? destinationNameAr : destinationName}
              </Link>
              <span className="opacity-60">›</span>
              <span className="text-white font-semibold">
                {language === "ar"
                  ? collectionTitleAr.replace(/\.$/, "")
                  : collectionTitle.replace(/\.$/, "")}
              </span>
            </nav>

            {/* Eyebrow */}
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300 mb-2">
              {language === "ar"
                ? `${destinationNameAr.toUpperCase()} · جوّ قطر`
                : `${collectionTitle.replace(/\.$/, "").toUpperCase()} · OCEANAIR`}
            </p>

            {/* Main Title H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white tracking-tight leading-[1.08] mb-3">
              {language === "ar" ? collectionTitleAr : collectionTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/90 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8">
              {language === "ar" ? collectionSubtitleAr : collectionSubtitle}
            </p>

            {/* 4 Feature Badges Strip (Capsule pills) */}
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

        {/* ==============================================================
            SECTION 2: FEATURED EXPERIENCE (Split Luxury Card)
            ============================================================== */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 pt-10 sm:pt-12 pb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-5 tracking-tight">
            {language === "ar" ? "التجربة المميزة" : "Featured Experience"}
          </h2>

          <div className="rounded-[22px] overflow-hidden border border-gray-200/80 shadow-[0_16px_45px_rgba(7,22,34,0.08)] bg-[#071F30] text-white grid grid-cols-1 lg:grid-cols-12 group">
            {/* Left Image Side (7 cols) */}
            <div className="relative min-h-[300px] sm:min-h-[380px] lg:col-span-7 overflow-hidden">
              <Image
                src={featuredTour.image}
                alt={featuredTour.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2 z-10">
                <span className="bg-black/90 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 shadow-sm">
                  {language === "ar" ? "الأكثر طلباً" : "BESTSELLER"}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#071622] text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span>🏆 TripAdvisor</span>
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#071622] text-[10.5px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  Michelin
                </span>
              </div>

              {/* Bottom Meta Overlay */}
              <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-2 text-xs font-bold">
                <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-white flex items-center gap-1.5 border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>4.9 · 30,565 reviews</span>
                  <span className="text-white/50">·</span>
                  <span>7h</span>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 flex items-center gap-1.5">
                <span className="w-6 h-1.5 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </div>

            {/* Right Content Side (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between space-y-6">
              {/* Header row: Eyebrow + Live Viewing Pulse */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                    {language === "ar"
                      ? "الأفضل في سفاري صحراء دبي"
                      : "TOP IN DUBAI DESERT SAFARI"}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10.5px] font-semibold text-white/90">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {language === "ar" ? "23 يشاهدون الآن" : "23 viewing now"}
                    </span>
                  </div>
                </div>

                {/* H2 Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-3">
                  {language === "ar" ? featuredTour.titleAr : featuredTour.title}
                </h3>

                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>

                {/* Verified Testimonial Quote */}
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed text-white/90 italic">
                  <p className="mb-2">
                    {language === "ar"
                      ? "“كان إنعام مرشداً استثنائياً وسائقاً محترفاً وممتعاً جداً. قدم لنا معلومات ثرية وشعرنا براحة وأمان تام. جولة لا تُنسى في صحراء دبي.”"
                      : "“Inaam was a super guide. He told us a lot about Dubai and was an excellent driver. We felt very comfortable with him. The tour was amazing.”"}
                  </p>
                  <p className="text-[11px] font-semibold not-italic text-cyan-300">
                    Lisa B. · 2026
                  </p>
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-white/70 tracking-wider">
                    {language === "ar" ? "ابتداءً من" : "From"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(featuredTour.price)}
                    </span>
                    {featuredTour.originalPrice && (
                      <span className="text-xs text-white/50 line-through">
                        {formatPrice(featuredTour.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/experiences/${featuredTour.slug}`}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-100 text-[#071622] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 group-hover:scale-102"
                >
                  <span>
                    {language === "ar" ? "عرض هذه التجربة" : "View this tour"}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: FILTERS & SORTING BAR (Matches Screenshot)
            ============================================================== */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 pt-6 pb-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-xs space-y-3">
            {/* Filter Pills Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. All Filters Drawer Trigger */}
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFiltersCount > 0
                      ? "bg-[#071622] text-white shadow-sm"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{language === "ar" ? "تصفية" : "Filters"}</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#0097CA] text-white text-[10px] flex items-center justify-center font-extrabold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Duration Filter Dropdown */}
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black cursor-pointer focus:outline-hidden"
                >
                  <option value="all">
                    {language === "ar" ? "المدة: الكل" : "Duration: All"}
                  </option>
                  <option value="under-5h">
                    {language === "ar" ? "أقل من 5 ساعات" : "Under 5 hours"}
                  </option>
                  <option value="over-5h">
                    {language === "ar" ? "أكثر من 5 ساعات" : "5+ hours"}
                  </option>
                </select>

                {/* Price Filter Dropdown */}
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black cursor-pointer focus:outline-hidden"
                >
                  <option value="all">
                    {language === "ar" ? "السعر: الكل" : "Price: All"}
                  </option>
                  <option value="under-50">
                    {language === "ar" ? "أقل من 50 EUR" : "Under EUR 50"}
                  </option>
                  <option value="50-100">
                    {language === "ar" ? "50 - 100 EUR" : "EUR 50 - 100"}
                  </option>
                  <option value="over-100">
                    {language === "ar" ? "أكثر من 100 EUR" : "Over EUR 100"}
                  </option>
                </select>

                {/* Time of Day */}
                <select
                  value={selectedTimeOfDay}
                  onChange={(e) => setSelectedTimeOfDay(e.target.value)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black cursor-pointer focus:outline-hidden"
                >
                  <option value="all">
                    {language === "ar" ? "وقت اليوم: الكل" : "Time of day: All"}
                  </option>
                  <option value="morning">
                    {language === "ar" ? "صباحاً" : "Morning"}
                  </option>
                  <option value="afternoon">
                    {language === "ar" ? "ظهراً" : "Afternoon"}
                  </option>
                  <option value="evening">
                    {language === "ar" ? "مساءً" : "Evening"}
                  </option>
                </select>

                {/* Rating Filter Dropdown */}
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseFloat(e.target.value) || 0)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black cursor-pointer focus:outline-hidden"
                >
                  <option value="0">
                    {language === "ar" ? "التقييم: الكل" : "Rating: All"}
                  </option>
                  <option value="4.8">
                    {language === "ar" ? "★ 4.8 وأعلى" : "★ 4.8 & up"}
                  </option>
                  <option value="4.5">
                    {language === "ar" ? "★ 4.5 وأعلى" : "★ 4.5 & up"}
                  </option>
                </select>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-[#DC2626] hover:underline px-2 cursor-pointer"
                  >
                    {language === "ar" ? "مسح التصفية" : "Clear filters"}
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
                  {language === "ar" ? "ترتيب حسب:" : "Sort:"}
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3.5 py-2 rounded-full text-xs font-bold bg-white border border-gray-200 text-black cursor-pointer focus:outline-hidden shadow-2xs"
                >
                  <option value="recommended">
                    {language === "ar" ? "الموصى به" : "Recommended"}
                  </option>
                  <option value="price-asc">
                    {language === "ar" ? "السعر: من الأقل للأعلى" : "Price: Low to High"}
                  </option>
                  <option value="price-desc">
                    {language === "ar" ? "السعر: من الأعلى للأقل" : "Price: High to Low"}
                  </option>
                  <option value="rating">
                    {language === "ar" ? "الأعلى تقييماً" : "Highest Rating"}
                  </option>
                  <option value="popular">
                    {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                  </option>
                </select>
              </div>
            </div>

            {/* Collection Header & Viewing Live Indicator */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2">
                <span>{language === "ar" ? destinationNameAr : destinationName} Desert Safari</span>
                <span className="text-gray-400 font-normal">·</span>
                <span className="text-xs font-normal text-gray-500">
                  {language === "ar"
                    ? `عرض ${filteredTours.length} جولات`
                    : `Show ${filteredTours.length} tours`}
                </span>
              </h2>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {language === "ar" ? "10 يشاهدون الآن" : "10 viewing now"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 4: THE 10 EXPERIENCE CARDS GRID (Matches Screenshot)
            ============================================================== */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Tour Card Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1.5 z-10">
                    {tour.isBestseller && (
                      <span className="bg-black/90 text-white text-[9.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        {language === "ar" ? "الأكثر طلباً" : "BESTSELLER"}
                      </span>
                    )}
                    {tour.savePercent && (
                      <span className="bg-[#DC2626] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {language === "ar"
                          ? `وفر ${tour.savePercent}%`
                          : `Save ${tour.savePercent}%`}
                      </span>
                    )}
                  </div>

                  {/* TripAdvisor & Michelin recognized icons */}
                  {(tour.hasTripAdvisorBadge || tour.hasMichelinBadge) && (
                    <div className="absolute bottom-2.5 left-3 rtl:left-auto rtl:right-3 z-10 flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full">
                      {tour.hasTripAdvisorBadge && <span>🏆 TA</span>}
                      {tour.hasMichelinBadge && <span>⭐ Michelin</span>}
                    </div>
                  )}
                </div>

                {/* Tour Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Destination & Duration Meta */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA] flex items-center gap-1.5 mb-1.5">
                      <span>{language === "ar" ? tour.destinationAr : tour.destination}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[#808283] font-normal">
                        {language === "ar" ? tour.durationAr : tour.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] font-bold text-black leading-snug line-clamp-2 min-h-[38px] group-hover:text-[#0097CA] transition-colors">
                      {language === "ar" ? tour.titleAr : tour.title}
                    </h3>
                  </div>

                  {/* Rating & Review Count */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-black">{tour.rating}</span>
                    <span className="text-gray-400 text-[11px]">
                      ({tour.reviews.toLocaleString()})
                    </span>
                  </div>

                  {/* Pricing and View Link */}
                  <div className="pt-2.5 border-t border-gray-100 flex items-end justify-between">
                    <div>
                      <span className="block text-[9.5px] uppercase font-bold text-gray-400">
                        {language === "ar" ? "ابتداءً من" : "From"}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-bold text-black">
                          {formatPrice(tour.price)}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/experiences/${tour.slug}`}
                      className="text-xs font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>{language === "ar" ? "عرض" : "View"}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==============================================================
            SECTION 5: "KEEP EXPLORING - MORE EXPERIENCES"
            ============================================================== */}
        <section className="bg-white border-y border-gray-100 py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block mb-1">
              {language === "ar" ? "واصل الاستكشاف" : "KEEP EXPLORING"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8">
              {language === "ar" ? "المزيد من التجارب" : "More experiences"}
            </h2>

            {/* 4 Squircle Cards Centered */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {MORE_EXPERIENCES.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border border-gray-200/80 mb-3 group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-black group-hover:text-[#0097CA] transition-colors leading-tight">
                    {language === "ar" ? item.titleAr : item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (Accordion)
            ============================================================== */}
        <section className="max-w-[960px] mx-auto px-4 md:px-6 lg:px-10 py-14 sm:py-20">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block mb-1">
            {language === "ar" ? "الأسئلة الشائعة" : "FREQUENTLY ASKED"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8">
            {language === "ar" ? "الأسئلة الأكثر تكراراً" : "Frequently asked questions"}
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-black">
                      {language === "ar" ? faq.questionAr : faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-600 transition-transform">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-black/75 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-150">
                      <p>{language === "ar" ? faq.answerAr : faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Filter Modal Drawer */}
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
                    <option value="under-5h">{language === "ar" ? "أقل من 5 ساعات" : "Under 5 hours"}</option>
                    <option value="over-5h">{language === "ar" ? "أكثر من 5 ساعات" : "5+ hours"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    {language === "ar" ? "نطاق السعر" : "Price Range"}
                  </label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-gray-50 text-black cursor-pointer"
                  >
                    <option value="all">{language === "ar" ? "جميع الأسعار" : "All Prices"}</option>
                    <option value="under-50">{language === "ar" ? "أقل من 50 EUR" : "Under EUR 50"}</option>
                    <option value="50-100">{language === "ar" ? "50 - 100 EUR" : "EUR 50 - 100"}</option>
                    <option value="over-100">{language === "ar" ? "أكثر من 100 EUR" : "Over EUR 100"}</option>
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
                    <option value="4.8">{language === "ar" ? "★ 4.8 وأعلى" : "★ 4.8 & up"}</option>
                    <option value="4.5">{language === "ar" ? "★ 4.5 وأعلى" : "★ 4.5 & up"}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-gray-500 hover:text-black cursor-pointer"
                >
                  {language === "ar" ? "مسح الكل" : "Reset"}
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

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
